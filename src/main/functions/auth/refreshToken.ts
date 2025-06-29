import "reflect-metadata";
import { lambdaHttpAdapter } from "@main/adapters/lambdaHttpAdapter";
import { Registry } from "@kernel/di/Registry";
import { RefreshTokenController } from "@aplication/controllers/auth/RefreshTokenController";

const controller = Registry.getInstance().resolve(RefreshTokenController);

export const handler = lambdaHttpAdapter(controller);
