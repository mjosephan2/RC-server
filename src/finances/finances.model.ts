import * as mongoose from 'mongoose'
import { IsNotEmpty } from 'class-validator'

export const FinanceSchema = new mongoose.Schema({
    title: {type: String, required: true},
    submitter: {type: String, required: true},
    amount: {type: Number, required: true},
    details: {type: String, default: ""},
    references:[{
        image:{type: String, default: ""}
    }],
    submitted_date: {type: Date, default: Date.now()},
    transaction_date: {type: Date, required: true}
})

export interface Finance extends mongoose.Document{
    finance_id: String
    title: String
    submitter: String
    amount: Number
    details: String
    references:[{
        image:String
    }],
    submitted_date: Date,
    transaction_date: Date
}

export class FinanceDTO {
    @IsNotEmpty() title: String
    @IsNotEmpty() submitter: String
    @IsNotEmpty() amount: Number
    details: String
    @IsNotEmpty() transaction_date: Date
}