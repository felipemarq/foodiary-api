import { Account } from "@aplication/entities/Account";
import { Goal } from "@aplication/entities/Goal";
import { Profile } from "@aplication/entities/Profile";
import { EmailAlreadyInUse } from "@aplication/errors/application/EmailAlreadyInUse";
import { AccountRepository } from "@infra/database/dynamo/repositories/AccountRepository";
import { GoalRepository } from "@infra/database/dynamo/repositories/GoalRepository";
import { ProfileRepository } from "@infra/database/dynamo/repositories/ProfileRepository";
import { SignUpUnitOfWork } from "@infra/database/uow/SignUpUnitOfWork";
import { AuthGateway } from "@infra/gateways/AuthGateway";
import { Injectable } from "@kernel/decorators/Injectable";

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly authGateway: AuthGateway,
    private readonly accountRepository: AccountRepository,
    private readonly signUpUnitOfWork: SignUpUnitOfWork
  ) {}
  async execute({ account: { email, password }, profile: profileInfo }: SignUpUseCase.Input): Promise<SignUpUseCase.Output> {
    const emailAlreadyExists = await this.accountRepository.findByEmail(email);
    if (emailAlreadyExists) {
      throw new EmailAlreadyInUse();
    }
    const account = new Account({ email });
    const profile = new Profile({ ...profileInfo, accountId: account.id });
    const { externalId } = await this.authGateway.signUp({
      email,
      password,
      internalId: account.id,
    });

    const goal = new Goal({
      accountId: account.id,
      calories: 2500,
      proteins: 180,
      fats: 100,
      carbohydrates: 100,
    });

    account.externalId = externalId;

    await this.signUpUnitOfWork.run({
      account,
      profile,
      goal,
    });

    const { accessToken, refreshToken } = await this.authGateway.signIn({ email, password });
    return {
      accessToken,
      refreshToken,
    };
  }
}

export namespace SignUpUseCase {
  export type Input = {
    account: { email: string; password: string };
    profile: {
      name: string;
      birthDate: Date;
      gender: Profile.Gender;
      height: number;
      weight: number;
      activityLevel: Profile.ActivityLevel;
      goal: Profile.Goal;
    };
  };
  export type Output = {
    accessToken: string;
    refreshToken: string;
  };
}
