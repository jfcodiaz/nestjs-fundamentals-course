import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductionCofigService{
  getName() {
    console.log("production");
  } 

}