import { Account } from "@aplication/entities/Account";
import { PutCommand, PutCommandInput, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "@infra/clients/dynamoClient";
import { Injectable } from "@kernel/decorators/Injectable";
import { AppConfig } from "@shared/config/AppConfig";
import { AccountItem } from "../items/AccountItem";
import { Profile } from "@aplication/entities/Profile";
import { ProfileItem } from "../items/ProfileItem";
import { GoalItem } from "../items/GoalItem";
import { Goal } from "@aplication/entities/Goal";

@Injectable()
export class GoalRepository {
  constructor(private readonly config: AppConfig) {}

  getPutCommandInput(goal: Goal): PutCommandInput {
    const goalItem = GoalItem.fromEntity(goal);

    return {
      TableName: this.config.db.dynamoDb.mainTable,
      Item: goalItem.toItem(),
    };
  }

  async create(goal: Goal): Promise<void> {
    await dynamoClient.send(new PutCommand(this.getPutCommandInput(goal)));
  }
}
