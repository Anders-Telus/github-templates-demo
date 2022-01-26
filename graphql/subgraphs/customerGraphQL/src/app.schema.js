import { createApplication } from "graphql-modules";
import { customerModule } from './services/customer/customerModule';

const application = createApplication({
  modules: [
    customerModule
  ],
});

const appSchema = application.createSchemaForApollo();

export default appSchema;
