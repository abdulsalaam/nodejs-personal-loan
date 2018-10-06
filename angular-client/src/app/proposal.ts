export class Proposal {
    id: number;
    nid: number;
    bank: string;
    bankLogo: string;
    bankLogoAlt: string;
    bankLogoHeight: number;
    bankLogoWidth: number;
    productId: number;
    productName: string;
    maximumAmount: number;
    minimumAmount: number;
    minimumTenure: number;
    maximumTenure: number;
    minimumIncome: number;
    minimumAge: number;
    maximumAge: number;
    tenureType: string;
    interestFormat: string;
    smallBusinessLoans: Boolean;
    personalLoanRates: SubPersonalLoanRatesEntity[];
    maximumFinancingAmount: string;
    employmentEligibility: string;
    metatags: {
    title: { value : string } ;
    description: { value : string } ;
    keywords: { value : string } ;
    };
    title: string;
    description: string;
    keywords: string;
    product_description: string;
    featured_highlights: SubFeaturedHighlightsEntity[];
    maximum_financing_amount: SubMaximumFinancingAmountEntity[];
    minimum_financing_amount: string;
    minimum_loan_tenure: number;
    maximum_loan_tenure: string;
    body: string;
    minIrate: number;
    maxIrate: number;
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
