import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsService } from '../products/products.service';
import { ProductsModule } from '../products/products.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    ProductsModule,
    AuthModule
  ]
})
export class SeedModule {}
