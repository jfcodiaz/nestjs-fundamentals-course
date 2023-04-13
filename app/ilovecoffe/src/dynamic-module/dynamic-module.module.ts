import { DynamicModule, Module } from '@nestjs/common';


export class ModuleMsj {
  constructor(private moduleMessage){}
  sayMensage(implementMsj: string) {
    console.log(`Say [${this.moduleMessage} + ${implementMsj} ]`)
  }
}

@Module({})
export class CustomDynamicModule {

  static register(custonMenssage: string): DynamicModule {
    return {
      module: CustomDynamicModule,
      providers: [
        {
          provide: ModuleMsj,
          useFactory: () => new ModuleMsj(custonMenssage)
         }
      ],
      exports: [
        ModuleMsj
      ]
    }
  }
}
