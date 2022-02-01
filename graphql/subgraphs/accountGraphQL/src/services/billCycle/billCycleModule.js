import { createModule } from "graphql-modules";
import  billCycleTypeDefs  from "./typeDefs/Schema";
import  billCycleResolver  from "./resolvers/query.js";
import { fileURLToPath } from "url";
import { dirname }  from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const billCycleModule = createModule({
  id: "billCycle-module",
  dirname: __dirname,
  typeDefs: [
    billCycleTypeDefs
  ],
  resolvers: [
    billCycleResolver
  ],
});