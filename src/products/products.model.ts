import * as mongoose from 'mongoose'

export const ProductSchema = new mongoose.Schema ({
    product_name: { type: String, required: true},
    product_size: {type: Number, required: true},
    product_price: { type: Number, required: true },
    stock: { type: Number, default: 0, min: 0,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
      }}
})

export interface Product extends mongoose.Document {
    product_id: String,
    product_name: String,
    product_size: Number,
    product_price: Number,
    stock: Number
}

export interface ProductDTO {
    readonly product_name: String,
    readonly product_price: Number,
    readonly product_size: Number,
    readonly stock?: Number,
    readonly product_id?: String
}
ProductSchema.index({product_name:1, product_size: 1}, {unique: true})

