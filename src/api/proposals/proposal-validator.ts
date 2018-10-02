/* @abdul : 28-09-2018 */
import * as Joi from "joi";

export const createProposalModel = Joi.object().keys({
  product: Joi.string().required(),
  amount: Joi.number().required(),
  description: Joi.string().required()
});

export const storeProposalModel = Joi.object().keys({});

export const updateProposalModel = Joi.object().keys({
  product: Joi.string().required(),
  amount: Joi.number().required(),
  description: Joi.string().required(),
  completed: Joi.boolean()
});
