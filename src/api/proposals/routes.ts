import * as Hapi from "hapi";
import * as Joi from "joi";
import ProposalController from "./proposal-controller";
import * as ProposalValidator from "./proposal-validator";
import { jwtValidator } from "../users/user-validator";
import { IDatabase } from "../../database";
import { IServerConfigurations } from "../../configurations";
import fetch from 'node-fetch';
import * as Boom from "boom";

export default function (
  server: Hapi.Server,
  configs: IServerConfigurations,
  database: IDatabase
) {
  const proposalController = new ProposalController(configs, database);
  server.bind(proposalController);

  const initializeStore = async function () {
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
  };

  server.method('initializeStore', initializeStore, {});
  server.methods.initializeStore();

  server.route({
    method: "GET",
    path: "/proposals/{id}",
    options: {
      handler: proposalController.getProposalById,
      auth: "jwt",
      tags: ["api", "proposals"],
      description: "Get proposal by id.",
      validate: {
        params: {
          id: Joi.string().required()
        },
        headers: jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Proposal founded."
            },
            "404": {
              description: "Proposal does not exists."
            }
          }
        }
      }
    }
  });

  server.route({
    method: "GET",
    path: "/proposals",
    options: {
      handler: proposalController.getProposals,
      auth: false,
      tags: ["api", "proposals"],
      description: "Get all proposals.",
      validate: {
        query: {
          top: Joi.number().default(5),
          skip: Joi.number().default(0),
          loanAmount: Joi.number().default(0),
          tenure: Joi.number().default(0)
        }
      }
    }
  });

  server.route({
    method: "DELETE",
    path: "/proposals/{id}",
    options: {
      handler: proposalController.deleteProposal,
      auth: "jwt",
      tags: ["api", "proposals"],
      description: "Delete proposal by id.",
      validate: {
        params: {
          id: Joi.string().required()
        },
        headers: jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Deleted Proposal."
            },
            "404": {
              description: "Proposal does not exists."
            }
          }
        }
      }
    }
  });

  server.route({
    method: "PUT",
    path: "/proposals/{id}",
    options: {
      handler: proposalController.updateProposal,
      auth: "jwt",
      tags: ["api", "proposals"],
      description: "Update proposal by id.",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: ProposalValidator.updateProposalModel,
        headers: jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Deleted Proposal."
            },
            "404": {
              description: "Proposal does not exists."
            }
          }
        }
      }
    }
  });

  server.route({
    method: "POST",
    path: "/proposals",
    options: {
      handler: proposalController.createProposal,
      auth: "jwt",
      tags: ["api", "proposals"],
      description: "Create a proposal.",
      validate: {
        payload: ProposalValidator.createProposalModel,
        headers: jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Created Proposal."
            }
          }
        }
      }
    }
  });

  server.route({
    method: "POST",
    path: "/proposals/store",
    options: {
      handler: proposalController.initializeBankLoanProposal,
      auth: "jwt",
      tags: ["api", "proposals"],
      description: "Initialize Bank proposals.",
      validate: {
        payload: ProposalValidator.storeProposalModel,
        headers: jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Created Proposal."
            }
          }
        }
      }
    }
  });
}
