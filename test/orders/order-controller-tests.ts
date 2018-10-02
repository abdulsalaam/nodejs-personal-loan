/* @abdul : 28-09-2018 */
import * as chai from "chai";
import ProposalController from "../../src/api/proposals/proposal-controller";
import { IProposal } from "../../src/api/proposals/proposal";
import { IUser } from "../../src/api/users/user";
import * as Configs from "../../src/configurations";
import * as Server from "../../src/server";
import * as Database from "../../src/database";
import * as Utils from "../utils";

const configDb = Configs.getDatabaseConfig();
const database = Database.init(configDb);
const assert = chai.assert;
const serverConfig = Configs.getServerConfigs();

describe("ProposalController Tests", () => {
  let server;

  before(done => {
    Server.init(serverConfig, database).then(s => {
      server = s;
      done();
    });
  });

  beforeEach(done => {
    Utils.createSeedUserData(database, done);
    Utils.createSeedProposalData(database, done);
  });

  afterEach(done => {
    Utils.clearDatabase(database, done);
  });
  
  
   it("Create Store Proposal for customer with discount $5 for every $100, discount is $45 of 990", async () => {
       
    var user = Utils.createUserDummy();

    const loginResponse = await Utils.login(server, serverConfig, user);
    assert.equal(200, loginResponse.statusCode);
    var login: any = JSON.parse(loginResponse.payload);
   
    
    var proposal = {
        "product": "Shoes",
        "amount": 990,
        "description": "Shoes sports"
    };

    const res = await server.inject({
      method: "POST",
      url: serverConfig.routePrefix + "/proposals",
      payload: proposal,
      headers: { authorization: login.token }
    });

    var responseBody: any = JSON.parse(res.payload);
    //console.log(responseBody);
    assert.equal(201, res.statusCode);
    assert.equal(45, responseBody.discount);
  });
  
  
  
});
