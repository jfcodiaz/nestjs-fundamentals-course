import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {
  getName() {
    console.log("base");
  }
}