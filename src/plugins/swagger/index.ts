/* @abdul : 28-09-2018 */
import { IPlugin, IPluginInfo } from "../interfaces";
import * as Hapi from "hapi";

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    return server.register([
      require("inert"),
      require("vision"),
      {
        plugin: require("hapi-swagger"),
        options: {
          info: {
            title: "Loan Proposal Api",
            description: "Loan Proposal Api Documentation",
            version: "1.0"
          },
          tags: [
            {
              name: "proposals",
              description: "Api proposals interface."
            },
            {
              name: "users",
              description: "Api users interface."
            }
          ],
          swaggerUI: true,
          documentationPage: true,
          documentationPath: "/docs"
        }
      }
    ]);
  } catch (err) {
    console.log(`Error registering swagger plugin: ${err}`);
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: "Swagger Documentation", version: "1.0.0" };
    }
  };
};
