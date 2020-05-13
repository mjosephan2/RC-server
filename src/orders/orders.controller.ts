import { Controller, Post, Body, Get, Put, Delete, Param, ValidationPipe, UsePipes } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDTO } from './orders.model';

@Controller('order')
export class OrdersController {
    constructor(private readonly orderService: OrdersService){}

    @Post('insert')
    @UsePipes(new ValidationPipe())
    async insertOrder(@Body() order: OrderDTO){
        await this.orderService.insert(order)
        return {success: true, description: "INSERT SUCCESSFUL"}
    }

    @Get('get/ordered')
    async find(){
        const orders = await this.orderService.findAll()
        console.log(orders)
        return orders
    }

    @Put('update')
    async update(@Body() updateOrder:OrderDTO){
        await this.orderService.update(updateOrder.order_id, updateOrder)
        return {success: true, description: "UPDATE SUCCESSFUL"}
    }

    @Put('collect/:id')
    async collect(@Param('id') id: String){
        
    }
    @Delete('delete/:id')
    async delete(@Param('id') id:String){
        await this.orderService.delete(id)
        return {success: true, description: "DELETE SUCCESSFUL"}
    }
}
