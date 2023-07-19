import { Module } from '@nestjs/common';
import { Auth0Guard } from './auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, Auth0Guard],
  exports: [JwtStrategy, Auth0Guard],
})
export class ApiAuthModule {}
