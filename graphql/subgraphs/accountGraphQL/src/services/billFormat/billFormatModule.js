import { createModule } from "graphql-modules";
import  billFormatTypeDefs  from "./typeDefs/BILLFormatSchema.js";
import  billFormatResolver  from "./resolvers/query.js";
import { fileURLToPath } from "url";
import { dirname }  from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const billFormatModule = createModule({
  id: "billFormat-module",
  dirname: __dirname,
  typeDefs: [
    billFormatTypeDefs
  ],
  resolvers: [
    billFormatResolver
  ],
});