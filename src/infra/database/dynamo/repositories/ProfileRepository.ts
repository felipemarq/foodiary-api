import { Account } from "@aplication/entities/Account";
import { PutCommand, PutCommandInput, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "@infra/clients/dynamoClient";
import { Injectable } from "@kernel/decorators/Injectable";
import { AppConfig } from "@shared/config/AppConfig";
import { AccountItem } from "../items/AccountItem";
import { Profile } from "@aplication/entities/Profile";
import { ProfileItem } from "../items/ProfileItem";

@Injectable()
export class ProfileRepository {
  constructor(private readonly config: AppConfig) {}

  getPutCommandInput(profile: Profile): PutCommandInput {
    const profileItem = ProfileItem.fromEntity(profile);

    return {
      TableName: this.config.db.dynamoDb.mainTable,
      Item: profileItem.toItem(),
    };
  }

  async create(profile: Profile): Promise<void> {
    await dynamoClient.send(new PutCommand(this.getPutCommandInput(profile)));
  }
}
