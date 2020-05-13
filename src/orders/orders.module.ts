import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './orders.model';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';


@Module({
    imports: [ProductsModule,MongooseModule.forFeature([{name: "Order", schema: OrderSchema}])],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
