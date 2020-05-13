import { Controller, Get, Post, Put, Body, Delete, Param } from '@nestjs/common';
import { ProductDTO } from './products.model';
import { ProductsService } from './products.service';

@Controller('product')
export class ProductsController {
    constructor(private readonly productService:ProductsService){}
    @Post('insert')
    async insertProduct(@Body('product') product:ProductDTO){
        await this.productService.create(product)
        return {success: true, Description: "INSERT SUCCESSFUL"}
    }

    @Get('get')
    async getProducts(){
        const products = await this.productService.findAll()
        return {products: products}
    }

    @Put('update')
    async updateProduct(@Body('product') product: ProductDTO){
        await this.productService.update(product)
        return {success: true, Description: "UPDATE SUCCESSFUL"}
    }

    @Delete('delete/:id')
    async deleteProduct(@Param('id') id:String) {
        await this.productService.delete(id)
        return {success: true, Description: "DELETE SUCCESSFUL"}
    }
}
