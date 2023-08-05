import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Auth0Guard } from './auth.guard';
import { EmployeeAuth0Guard } from './employee-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, Auth0Guard, EmployeeAuth0Guard],
  exports: [JwtStrategy, Auth0Guard, EmployeeAuth0Guard],
})
export class ApiAuthModule {}
