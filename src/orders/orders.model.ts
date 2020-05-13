import * as mongoose from 'mongoose'
import { ValidateNested, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'
import { Product } from '../products/products.model'
const ProductOrderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity:{type: Number, default: 0}
}, {_id: false})

export const OrderSchema = new mongoose.Schema ({
    date_ordered: {type: Date, default: Date.now()},
    date_received: {type: Date, default: null},
    customer: {
        customer_id: {type: String, required: true},
        full_name:{type: String, required: true},
        email:{type: String, required: true}
    },
    status: {type: String, enum: ["ORDERED", "COLLECTED"], default: "ORDERED"},
    description: {type: String, default: ""},
    items: {type:[ProductOrderSchema]}
})

export interface Customer {
    customer_id: String
    full_name: String
    email: String
}

interface ProductOrder {
    product: Product;
    quantity: Number;
}
export interface Order extends mongoose.Document {
    order_id: String;
    date_ordered: Date;
    date_received: Date;
    customer: Customer;
    status: String
    description: String
    items: ProductOrder[]   
    total_price: Number
}

class ProductOrderClass{
    @IsNotEmpty()
    product: Product;
    quantity: Number;
}
export class OrderDTO{
    readonly order_id: String
    readonly customer: Customer
    readonly date_received?: Date
    readonly status?: String
    readonly description?: String
    
    @ValidateNested()
    @Type(() => ProductOrderClass)
    readonly items: ProductOrderClass[]
}
