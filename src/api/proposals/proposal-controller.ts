import * as Hapi from "hapi";
import * as Boom from "boom";
import { IProposal } from "./proposal";
import { IUser } from "../users/user";
import { IDatabase } from "../../database";
import { IServerConfigurations } from "../../configurations";
import { IRequest } from "../../interfaces/request";
import { ILogging } from "../../plugins/logging/logging";
import * as moment from 'moment';
import fetch from 'node-fetch';
/* @abdul : 28-09-2018 8:29PM */
//Custom helper module
import * as Helper from "../../utils/helper";

export default class ProposalController {
  private database: IDatabase;
  private configs: IServerConfigurations;
  private EMPLOYEE_DISCOUNT = 30;
  private AFFILIATE_DISCOUNT = 10;
  private CUSTOMER__2YEAR_DISCOUNT = 5;
  private EXTRA_DISCOUNT = 5;

  constructor(configs: IServerConfigurations, database: IDatabase) {
	this.configs = configs;
	this.database = database;
  }

  private generateDiscount(user: IUser, amount: number) {
	let years = moment().diff(user.createdAt, 'years', false);
	let discount = 0;
    if (user.userType === 'employee') {
    discount = (this.EMPLOYEE_DISCOUNT / 100 * amount);
    } else if (user.userType === 'affiliate') {
    discount = (this.AFFILIATE_DISCOUNT / 100 * amount);
    } else if (user.userType === 'customer' && years >= 2) {
    discount = (this.AFFILIATE_DISCOUNT / 100 * amount);
    }
	let extraDiscount = Math.trunc(amount / 100) * 5 ;
	return (discount + extraDiscount);
  }

  public async createProposal(request: IRequest, h: Hapi.ResponseToolkit) {
	var newProposal: IProposal = <IProposal>request.payload;
	newProposal.userId = request.auth.credentials.id;
	try {
	  const id = request.auth.credentials.id;
	  let user: IUser = await this.database.userModel.findById(id);
	  newProposal.discount = await this.generateDiscount(user, newProposal.amount);
	  newProposal.netAmount = newProposal.amount - newProposal.discount;
	  let proposal: IProposal = await this.database.proposalModel.create(newProposal);
	  return h.response(proposal).code(201);
	} catch (error) {
	  return Boom.badImplementation(error);
	}
  }

  public async updateProposal(request: IRequest, h: Hapi.ResponseToolkit) {
	let userId = request.auth.credentials.id;
	let _id = request.params["id"];

	try {
	  let proposal: IProposal = await this.database.proposalModel.findByIdAndUpdate(
		{ _id, userId }, //ES6 shorthand syntax
		{ $set: request.payload },
		{ new: true }
	  );

	  if (proposal) {
		return proposal;
	  } else {
		return Boom.notFound();
	  }
	} catch (error) {
	  return Boom.badImplementation(error);
	}
  }

  public async deleteProposal(request: IRequest, h: Hapi.ResponseToolkit) {
	let id = request.params["id"];
	let userId = request["auth"]["credentials"];

	let deletedProposal = await this.database.proposalModel.findOneAndRemove({
	  _id: id,
	  userId: userId
	});

	if (deletedProposal) {
	  return deletedProposal;
	} else {
	  return Boom.notFound();
	}
  }

  public async getProposalById(request: IRequest, h: Hapi.ResponseToolkit) {
	let userId = request.auth.credentials.id;
	let _id = request.params["id"];

	let proposal = await this.database.proposalModel.findOne({ _id, userId })
	  .lean(true);

	if (proposal) {
	  return proposal;
	} else {
	  return Boom.notFound();
	}
  }

  public async getProposals(request: IRequest, h: Hapi.ResponseToolkit) {
	//let userId = request.auth.credentials.id;
	let top = request.query["top"];
	let skip = request.query["skip"];
    let loanAmount = request.query["loanAmount"];
    let tenure = request.query["tenure"];
	let proposals = await this.database.proposalBankModel
	  //.find({ userId: userId })
      .find({})
	  .lean(true)
	  .skip(skip)
	  .limit(top);

   let finalProposals = [];
   for (var i = 0; i < proposals.length; i++) {
        //console.log(proposals[i]);
        let principal_installment = loanAmount / (tenure * 12);
        let yearly_interest = (loanAmount * proposals[i].minIrate) / 100;
        let monthly_interest = yearly_interest / 12;
        let monthly_repayment = monthly_interest + principal_installment;

        let total_interest_payable = yearly_interest * tenure;
        let total_amount_payable = loanAmount + ( yearly_interest * tenure );
        let total_tenure_months = tenure * 12;

        proposals[i]['loanBreakup'] = {
            'summary' : 'RM ' + loanAmount + ' for ' + tenure + ' years with interest rate of ' + proposals[i].minIrate + '% per annum',
            'monthly_repayment' : monthly_repayment,
            'total_interest_payable' : total_interest_payable,
            'total_amount_payable' : total_amount_payable,
            'total_tenure_months' : total_tenure_months
            };

    }
	return proposals;
  }


// store proposal in databse

 public async initializeBankLoanProposal(request: IRequest, h: Hapi.ResponseToolkit) {
	var newProposal: IProposal = <IProposal>request.payload;
	newProposal.userId = request.auth.credentials.id;
	try {
      //let inserted = this.database.proposalBankModel.insertMany(documents);
	  let response = await fetch(' https://www.imoney.my/json/personal-loan-desktop.json');
      // only proceed once promise is resolved
      let data = await response.json();
      let importer = [];
      await data.forEach(function (record) {
          //console.log('json data one by one:', record);
          importer.push(record);
      });
       let inserted = this.database.proposalBankModel.insertMany(importer);
      // only proceed once second promise is resolved
      return data;
	} catch (error) {
	  return Boom.badImplementation(error);
	}
  }
}