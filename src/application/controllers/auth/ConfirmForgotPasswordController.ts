import { Controller } from "@aplication/contracts/Controller";
import { Schema } from "@kernel/decorators/Schema";
import { Injectable } from "@kernel/decorators/Injectable";
import {
  ConfirmForgotPasswordBody,
  confirmForgotPasswordSchema,
} from "./schemas/confirmForgotPasswordSchema";
import { ConfirmForgotPasswordUseCase } from "@aplication/useCases/auth/ConfirmForgotPasswordUseCase";
import { BadRequest } from "@aplication/errors/http/BadRequest";

@Injectable()
@Schema(confirmForgotPasswordSchema)
export class ConfirmForgotPasswordController extends Controller<
  "public",
  ConfirmForgotPasswordController.Response
> {
  constructor(private readonly confirmForgotPasswordUseCase: ConfirmForgotPasswordUseCase) {
    super();
  }

  protected override async handle({
    body,
  }: Controller.Request<"public", ConfirmForgotPasswordBody>): Promise<
    Controller.Response<ConfirmForgotPasswordController.Response>
  > {
    try {
      const { email, confirmationCode, password } = body;

      await this.confirmForgotPasswordUseCase.execute({ email, confirmationCode, password });
      return {
        statusCode: 204,
      };
    } catch (error) {
      throw new BadRequest();
    }
  }
}

export namespace ConfirmForgotPasswordController {
  export type Response = null;
}
