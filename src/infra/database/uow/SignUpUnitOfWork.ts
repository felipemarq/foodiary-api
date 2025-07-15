import { TransactWriteCommand } from "@aws-sdk/lib-dynamodb";
import { UnitOfWork } from "./UnitOfWork";
import { Account } from "@aplication/entities/Account";
import { Profile } from "@aplication/entities/Profile";
import { Goal } from "@aplication/entities/Goal";
import { ProfileRepository } from "../dynamo/repositories/ProfileRepository";
import { Injectable } from "@kernel/decorators/Injectable";
import { AccountRepository } from "../dynamo/repositories/AccountRepository";
import { GoalRepository } from "../dynamo/repositories/GoalRepository";

@Injectable()
export class SignUpUnitOfWork extends UnitOfWork {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly goalRepository: GoalRepository
  ) {
    super();
  }

  async run({ account, goal, profile }: SignUpUnitOfWork.RunParams) {
    this.addPut(this.accountRepository.getPutCommandInput(account));
    this.addPut(this.profileRepository.getPutCommandInput(profile));
    this.addPut(this.goalRepository.getPutCommandInput(goal));
    await this.commit();
  }
}

export namespace SignUpUnitOfWork {
  export type RunParams = {
    account: Account;
    profile: Profile;
    goal: Goal;
  };
}
