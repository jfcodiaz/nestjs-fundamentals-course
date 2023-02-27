import { Injectable } from "@nestjs/common";

@Injectable()
export class DevelopmentConfigService {
  getName() {
    console.log("dev");
  }
  
}