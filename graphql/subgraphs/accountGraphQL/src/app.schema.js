import { createApplication } from "graphql-modules";
import { billFormatModule }  from "./services/billFormat/billFormatModule.js";
import { billCycleModule } from "./services/billCycle/billCycleModule.js";

const application = createApplication({
  modules: [
    billFormatModule,
    billCycleModule
  ],
});

 const appSchema = application.createSchemaForApollo();

 export default appSchema; 