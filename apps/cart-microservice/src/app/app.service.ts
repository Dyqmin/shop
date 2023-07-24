import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class AppService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async setCart(userId: string, items?: any) {
    try {
      const redisTrans = this.redis.multi();
      redisTrans.hset(`cart:${userId}`, items);
      await redisTrans.expire(`cart:${userId}`, 60 * 60).exec();
      return 'OK';
    } catch (e) {
      return new Error('Error setting cart');
    }
  }

  async getCart(id: string) {
    const cartItems = await this.redis.hgetall(`cart:${id}`);
    const result = [];
    Object.entries(cartItems).forEach(([k, v]) => {
      const parsed = JSON.parse(v);
      result.push({
        product: JSON.parse(parsed['product']),
        quantity: parsed.quantity,
      });
    });
    return result || [];
  }
}
