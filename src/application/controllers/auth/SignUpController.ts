import { Controller } from "@aplication/contracts/Controller";

import { Schema } from "@kernel/decorators/Schema";

import { SignUpUseCase } from "@aplication/useCases/SignUpUseCase";
import { Injectable } from "@kernel/decorators/Injectable";
import { SignUpBody, signUpSchema } from "./schemas/signUpSchema";
import { request } from "http";

@Injectable()
@Schema(signUpSchema)
export class SignUpController extends Controller<SignUpController.Response> {
  constructor(private readonly SignUpUseCase: SignUpUseCase) {
    super();
  }

  protected override async handle({
    body,
  }: Controller.Request<SignUpBody>): Promise<Controller.Response<SignUpController.Response>> {
    const { account } = body;
    const { accessToken, refreshToken } = await this.SignUpUseCase.execute(account);
    return {
      statusCode: 201,
      body: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
  }
}

export namespace SignUpController {
  export type Response = {
    accessToken: string;
    refreshToken: string;
  };
}
