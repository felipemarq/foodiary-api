import { Controller } from "@aplication/contracts/Controller";

import { Schema } from "@kernel/decorators/Schema";

import { Injectable } from "@kernel/decorators/Injectable";
import { SignInUseCase } from "@aplication/useCases/auth/SignInUseCase";

import { RefreshTokenBody, refreshTokenSchema } from "./schemas/refreshTokenSchema";
import { RefreshTokenUseCase } from "@aplication/useCases/auth/RefreshTokenUseCase";
import { ForgotPasswordUseCase } from "@aplication/useCases/auth/ForgotPasswordUseCase";
import { ForgotPasswordBody, forgotPasswordSchema } from "./schemas/forgotPasswordSchema";
import { BadRequest } from "@aplication/errors/http/BadRequest";

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
    try {
      const { email } = body;

      await this.forgotPasswordUseCase.execute({
        email,
      });
      return {
        statusCode: 204,
      };
    } catch (error) {
      throw new BadRequest();
    }
  }
}

export namespace ForgotPasswordController {
  export type Response = null;
}
