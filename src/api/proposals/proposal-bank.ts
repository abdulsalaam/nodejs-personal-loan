/* @abdul : 28-09-2018 */
import * as Mongoose from "mongoose";

export interface IProposalBank extends Mongoose.Document {
    nid: Number;
    bank: String;
    bankLogo: String;
    bankLogoAlt: String;
    bankLogoHeight: Number;
    bankLogoWidth: Number;
    productId: Number;
    productName: String;
    maximumAmount: Number;
    minimumAmount: Number;
    minimumTenure: Number;
    maximumTenure: Number;
    minimumIncome: Number;
    minimumAge: Number;
    maximumAge: Number;
    tenureType: String;
    interestFormat: String;
    smallBusinessLoans: Boolean;
    personalLoanRates: SubPersonalLoanRatesEntity[];
    maximumFinancingAmount: String;
    employmentEligibility: String;
    metatags: {
    title: { value : String } ;
    description: { value : String } ;
    keywords: { value : String } ;
    };
    title: String;
    description: String;
    keywords: String;
    product_description: String;
    featured_highlights: SubFeaturedHighlightsEntity[];
    maximum_financing_amount: SubMaximumFinancingAmountEntity[];
    minimum_financing_amount: String;
    minimum_loan_tenure: Number;
    maximum_loan_tenure: String;
    body: String;
    minIrate: Number;
    maxIrate: Number;
    createdAt: Date;
    updateAt: Date;
}

export interface SubPersonalLoanRatesEntity {
    key1: String;
    value: String;
}

export interface SubFeaturedHighlightsEntity {
    value: String;
    format: String;
    safe_value: String;
}

export interface SubMaximumFinancingAmountEntity {
    title: { value : String } ;
    description: { value : String } ;
    keywords: { value : String } ;
}

export interface SubMetatagsEntity {
    value: String;
    format: String;
    safe_value: String;
}

let subPersonalLoanRatesSchema = new Mongoose.Schema({
    key1: String,
    value: String
}, { _id : false });

let subFeaturedHighlightsSchema = new Mongoose.Schema({
    value: String,
    format: String,
    safe_value: String
}, { _id : false });

let subMaximumFinancingSchema = new Mongoose.Schema({
    value: String,
    format: String,
    safe_value: String
}, { _id : false });


export const ProposalBankSchema = new Mongoose.Schema(
  {
    nid: Number,
    bank: String,
    bankLogo: String,
    bankLogoAlt: String,
    bankLogoHeight: Number,
    bankLogoWidth: Number,
    productId: Number,
    productName: String,
    maximumAmount: Number,
    minimumAmount: Number,
    minimumTenure: Number,
    maximumTenure: Number,
    minimumIncome: Number,
    minimumAge: Number,
    maximumAge: Number,
    tenureType: String,
    interestFormat: String,
    smallBusinessLoans: Boolean,
    personalLoanRates: [subPersonalLoanRatesSchema],
    maximumFinancingAmount: String,
    employmentEligibility: String,
        metatags: {
        title: { value : String },
        description: { value : String },
        keywords: { value : String }
    },
    title: String,
    description: String,
    keywords: String,
    product_description: String,
    featured_highlights: [subFeaturedHighlightsSchema],
    maximum_financing_amount:[subMaximumFinancingSchema],
    minimum_financing_amount: String,
    minimum_loan_tenure: String,
    maximum_loan_tenure: String,
    body: String,
    minIrate: Number,
    maxIrate: Number
  },
  {
    timestamps: true
  }
);

export const ProposalBankModel = Mongoose.model<IProposalBank>("ProposalBank", ProposalBankSchema);
