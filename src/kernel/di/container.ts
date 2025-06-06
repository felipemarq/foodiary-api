import "reflect-metadata";
import { HelloController } from "@aplication/controllers/HelloController";
import { HelloUseCase } from "@aplication/useCases/HelloUseCase";
import { Registry } from "@kernel/di/Registry";
import { CreateMealUseCase } from "@aplication/useCases/CreateMealUseCase";

export const container = Registry.getInstance();
container.register(HelloUseCase);
container.register(HelloController);
container.register(CreateMealUseCase);
