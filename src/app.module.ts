import { OrdersModule } from './orders/orders.module';
import { OrdersService } from './orders/orders.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
        OrdersModule, MongooseModule.forRoot(process.env.MONGO_URI), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
