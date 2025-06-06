import "reflect-metadata";
import { HelloController } from "@aplication/controllers/HelloController";
import { lambdaHttpAdapter } from "@main/adapters/lambdaHttpAdapter";
import { HelloUseCase } from "@aplication/useCases/HelloUseCase";
import { Registry } from "@kernel/di/Registry";
import { container } from "@kernel/di/container";

const controller = container.resolve(HelloController);

export const handler = lambdaHttpAdapter(controller);
