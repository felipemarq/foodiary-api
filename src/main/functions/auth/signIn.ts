import "reflect-metadata";
import { lambdaHttpAdapter } from "@main/adapters/lambdaHttpAdapter";
import { Registry } from "@kernel/di/Registry";
import { SignInController } from "@aplication/controllers/auth/SignInController";

const controller = Registry.getInstance().resolve(SignInController);

export const handler = lambdaHttpAdapter(controller);
