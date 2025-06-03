import { APIGatewayProxyEventV2 } from "aws-lambda";
import { HelloController } from "../../application/controllers/HelloController";
import { lambdaBodyParser } from "../utils/lambdaBodyParser";
import { lambdaHttpAdapter } from "../adapters/lambdaHttpAdapter";

const controller = new HelloController();

export const handler = lambdaHttpAdapter(controller);
