import { Controller } from "@aplication/contracts/Controller";
import { Injectable } from "@kernel/decorators/Injectable";
import KSUID from "ksuid";

@Injectable()
export class CreateMealController extends Controller<"private", CreateMealController.Response> {
  protected override async handle({
    accountId,
  }: Controller.Request<"private">): Promise<Controller.Response<CreateMealController.Response>> {
    return {
      statusCode: 200,
      body: {
        accountId,
      },
    };
  }
}

export namespace CreateMealController {
  export type Response = {
    accountId: string;
  };
}
