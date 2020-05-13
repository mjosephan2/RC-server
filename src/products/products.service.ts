import { Injectable, HttpException, BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDTO } from './products.model';

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel:Model<Product>){}
    
    OPTION = {runValidation: true}
    async create(productDTO: ProductDTO){
        var newProduct;
        try {
            newProduct = new this.productModel(productDTO)
        } catch (error) {
            throw new BadRequestException(error.errmsg)
        }
        await newProduct.save()
    }

    async findAll(){
        const products = await this.productModel.find().exec()
        return products.map(_product => {
            return {
                product_id: _product._id,
                product_name: _product.product_name,
                product_size: _product.product_size,
                product_price: _product.product_price,
                stock: _product.stock
            }
        })
    }

    async update(product: ProductDTO){
        if (!product.product_id){
            throw new BadRequestException('Please provide the product id')
        }
        try {
            await this.productModel.updateOne({_id: product.product_id}, product, this.OPTION)
        } catch (error) {
            throw new BadRequestException(error.errmsg)
        }
    }

    async delete(id: String){
        await this.productModel.deleteOne({_id: id})
    }
}