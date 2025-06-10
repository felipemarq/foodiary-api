import "reflect-metadata";
import { SignUpController } from "@aplication/controllers/auth/SignUpController";
import { lambdaHttpAdapter } from "@main/adapters/lambdaHttpAdapter";
import { Registry } from "@kernel/di/Registry";

const controller = Registry.getInstance().resolve(SignUpController);

export const handler = lambdaHttpAdapter(controller);
