import { createApplication } from "graphql-modules";
import { billFormatModule }  from "./services/billFormat/billFormatModule.js";

const application = createApplication({
  modules: [
    billFormatModule
  ],
});

 const appSchema = application.createSchemaForApollo();

 export default appSchema; 