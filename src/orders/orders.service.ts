import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order, OrderDTO} from './orders.model';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../products/products.model';

@Injectable()
export class OrdersService {
    constructor(@InjectModel('Order') private readonly OrderModel:Model<Order>,
    private readonly ProductModel:Model<Product>){}

    async findAll(){
        const orders = await this.OrderModel.find().populate('items.product')

        // need to find a better way to reformat
        // reformat
        return orders.map(_order=>{
            let total_price = BigInt(0)
            const items = _order.items.map(_item => {
                if (!_item.product){
                    return null
                }
                const price = BigInt(_item.product.product_price) * BigInt(_item.quantity)
                total_price = total_price + price
                return {
                    product_id: _item.product.id,
                    product_name: _item.product.product_name,
                    product_price: _item.product.product_price,
                    product_size: _item.product.product_size,
                    quantity: _item.quantity
                }
            })
            return {
                order_id: _order.id,
                date_ordered: _order.date_ordered,
                date_received: _order.date_received,
                customer: _order.customer,
                status: _order.status,
                description: _order.description,
                items: items,
                total_price: Number(total_price)
            }

        })
    }

    async insert(orderDTO:OrderDTO){
        const order = new this.OrderModel(orderDTO)
        await order.save()
    }

    async update(id: String, order: OrderDTO){
        if (!id){
            throw new BadRequestException('Please provide the order id')
        }
        try {
            return await this.OrderModel.updateOne({_id:id}, order, {runValidators: true})
        } catch (error) {
            throw new BadRequestException(error.errmsg)
        }

    }

    async collect(id: String){
        try {
            const session = await this.OrderModel.db.startSession();
            session.startTransaction()
            try {
                const order = await this.OrderModel.findById(id)
                const order_id = order.id

                // update the stock
                await Promise.all(order.items.map( async item => {
                    const product_id = item.product
                    const quantity = item.quantity

                    const product = await this.ProductModel.findById(product_id)
                    const newStock = Number(product.stock) - Number(quantity)

                    await this.ProductModel.update({_id: product_id}, {stock: newStock}, {runValidators: true}).exec()
                }))

                // update the order status
                this.OrderModel.update({_id: order_id}, {status: "COLLECTED"}, {runValidators: true})
            } catch (error) {
                await session.abortTransaction()
                throw new BadRequestException(`Failed to update the order`)
            } finally{
                session.endSession()
            }
        } catch (error) {
            throw new BadRequestException(`Transaction could not be created`)
        }
    }
    
    async delete(id: String){
        await this.OrderModel.deleteOne({_id: id})
    }
}
