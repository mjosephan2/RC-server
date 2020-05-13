import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Finance, FinanceDTO } from "./finances.model";

@Injectable()
export class FinancesService{
    constructor(@InjectModel("Finance") private readonly FinanceModel: Model<Finance>){}

    async getAll(){
        return await this.FinanceModel.find()
    }

    async insert(financeDTO:FinanceDTO){

    }

    async getImage(id: String){

    }

    async delete(id: String){
        
    }
}