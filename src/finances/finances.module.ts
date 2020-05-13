import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FinanceSchema } from "./finances.model";
import { FinancesController } from "./finances.controller";
import { FinancesService } from "./finances.service";

@Module({
    imports:[MongooseModule.forFeature([{name: "Finance", schema: FinanceSchema}])],
    controllers:[FinancesController],
    providers:[FinancesService],
})

export class FinancesModule{}