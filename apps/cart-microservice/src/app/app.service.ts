import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { CartItem } from "@shop-project/microservices/cart/types";

@Injectable()
export class AppService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async setCart(userId: string, items?: any) {
    try {
      const redisTrans = this.redis.multi();
      const cartId = `cart:${userId}`;
      redisTrans.hset(cartId, items);
      await redisTrans.expire(`cart:${userId}`, 60 * 60).exec();
      return this.getCart(userId);
    } catch (e) {
      return new Error('Error setting cart');
    }
  }

  async removeItem(userId: string, productId: string) {
    try {
      const redisTrans = this.redis.multi();
      const cartId = `cart:${userId}`;
      redisTrans.hdel(cartId, productId);
      await redisTrans.expire(`cart:${userId}`, 60 * 60).exec();
      return this.getCart(userId);
    } catch (e) {
      return new Error('Error setting cart');
    }
  }

  async getCart(id: string) {
    const cartItems = await this.redis.hgetall(`cart:${id}`);
    const result: CartItem[] = [];
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
