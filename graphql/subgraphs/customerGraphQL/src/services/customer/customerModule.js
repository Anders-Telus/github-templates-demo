import { createModule } from "graphql-modules";

import customerTypeDefs from "./typeDefs/schema.js";
import customerResolver from "./resolvers/query.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const customerModule = createModule({
    id: "customer-module",
    dirname: __dirname,
    typeDefs: [
        customerTypeDefs
    ],
    resolvers: [
        customerResolver
    ],
});