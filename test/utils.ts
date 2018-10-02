import * as Database from "../src/database";

export function createProposalDummy(userId?: string, product?: string, amount? : number, description?: string) {
  var proposal = {
    product: product || "dummy proposal",
    amount : amount || 0,
    description: description || "I'm a dummy proposal!"
  };

  if (userId) {
    proposal["userId"] = userId;
  }

  return proposal;
}

export function createUserDummy(email?: string) {
  var user = {
    email: email || "dummy@mail.com",
    name: "Dummy Jones",
    userType : "customer",
    password: "123123"
  };

  return user;
}

export function clearDatabase(database: Database.IDatabase, done: MochaDone) {
  var promiseUser = database.userModel.remove({});
  var promiseProposal = database.proposalModel.remove({});

  Promise.all([promiseUser, promiseProposal])
    .then(() => {
      done();
    })
    .catch(error => {
      console.log(error);
    });
}

export function createSeedProposalData(database: Database.IDatabase, done: MochaDone) {
  return database.userModel
    .create(createUserDummy())
    .then(user => {
      return Promise.all([
        database.proposalModel.create(
          createProposalDummy(user._id, "Proposal 1", 990, "Some dummy data 1")
        ),
        database.proposalModel.create(
          createProposalDummy(user._id, "Proposal 2", 990, "Some dummy data 2")
        ),
        database.proposalModel.create(
          createProposalDummy(user._id, "Proposal 3", 990,"Some dummy data 3")
        )
      ]);
    })
    .then(proposal => {
      done();
    })
    .catch(error => {
      console.log(error);
    });
}

export function createSeedUserData(database: Database.IDatabase, done: MochaDone) {
  database.userModel
    .create(createUserDummy())
    .then(user => {
      done();
    })
    .catch(error => {
      console.log(error);
    });
}

export async function login(server, config, user) {
  if (!user) {
    user = createUserDummy();
  }

  return server.inject({
    method: "POST",
    url: config.routePrefix + "/users/login",
    payload: { email: user.email, password: user.password }
  });
}
