/* @abdul : 28-09-2018 */
import * as Mongoose from "mongoose";
import { IDataConfiguration } from "./configurations";
import { ILogging, LoggingModel } from "./plugins/logging/logging";
import { IUser, UserModel } from "./api/users/user";
import { IProposal, ProposalModel } from "./api/proposals/proposal";
import { IProposalBank, ProposalBankModel } from "./api/proposals/proposal-bank";

export interface IDatabase {
  loggingModel: Mongoose.Model<ILogging>;
  userModel: Mongoose.Model<IUser>;
  proposalModel: Mongoose.Model<IProposal>;
  proposalBankModel: Mongoose.Model<IProposalBank>;
}

export function init(config: IDataConfiguration): IDatabase {
  (<any>Mongoose).Promise = Promise;
  Mongoose.connect(process.env.MONGO_URL || config.connectionString);

  let mongoDb = Mongoose.connection;

  mongoDb.on("error", () => {
    console.log(`Unable to connect to database: ${config.connectionString}`);
  });

  mongoDb.once("open", () => {
    console.log(`Connected to database: ${config.connectionString}`);
  });

  return {
    loggingModel: LoggingModel,
    proposalModel: ProposalModel,
    userModel: UserModel,
    proposalBankModel: ProposalBankModel
  };
}
