import { z } from "zod";
import { Controller } from "../contracts/Controller";

const schema = z.object({
  name: z
    .string({
      message: "Name should be a string",
    })
    .min(2, "Name is too short"),
  email: z.string().min(5, "Email is too short").email("Invalid email"),
});

export class HelloController extends Controller<unknown> {
  protected override schema = schema;
  async handle(
    request: Controller.Request
  ): Promise<Controller.Response<unknown>> {
    return {
      statusCode: 200,
      body: {
        parsedBody: request.body,
      },
    };
  }
}
