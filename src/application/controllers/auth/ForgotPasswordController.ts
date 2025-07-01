import { Controller } from "@aplication/contracts/Controller";

import { Schema } from "@kernel/decorators/Schema";

import { Injectable } from "@kernel/decorators/Injectable";
import { SignInUseCase } from "@aplication/useCases/SignInUseCase";

import { RefreshTokenBody, refreshTokenSchema } from "./schemas/refreshTokenSchema";
import { RefreshTokenUseCase } from "@aplication/useCases/RefreshTokenUseCase";
import { ForgotPasswordUseCase } from "@aplication/useCases/ForgotPasswordUseCase";
import { ForgotPasswordBody, forgotPasswordSchema } from "./schemas/forgotPasswordSchema";

@Injectable()
@Schema(forgotPasswordSchema)
export class ForgotPasswordController extends Controller<
  "public",
  ForgotPasswordController.Response
> {
  constructor(private readonly forgotPasswordUseCase: ForgotPasswordUseCase) {
    super();
  }

  protected override async handle({
    body,
  }: Controller.Request<"public", ForgotPasswordBody>): Promise<
    Controller.Response<ForgotPasswordController.Response>
  > {
    const { email } = body;

    await this.forgotPasswordUseCase.execute({
      email,
    });
    return {
      statusCode: 204,
    };
  }
}

export namespace ForgotPasswordController {
  export type Response = null;
}
