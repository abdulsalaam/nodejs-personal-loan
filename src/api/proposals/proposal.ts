/* @abdul : 28-09-2018 */
import * as Mongoose from "mongoose";

export interface IProposal extends Mongoose.Document {
  userId: string;
  product: string;
  amount:number;
  discount:number;
  netAmount:number;
  description: string;
  completed: boolean;
  createdAt: Date;
  updateAt: Date;
}

export const ProposalSchema = new Mongoose.Schema(
  {
    userId: { type: String, required: true },
    product: { type: String, required: true },
    amount: { type: Number, required: true },
    discount: { type: Number, required: false },
    netAmount: { type: Number, required: false },
    description: String,
    completed: Boolean
  },
  {
    timestamps: true
  }
);

export const ProposalModel = Mongoose.model<IProposal>("Proposal", ProposalSchema);
