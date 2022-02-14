import billFormatTypeDefs  from "./billFormat/typeDefs/schema";
import billCycleTypeDefs  from "./billCycle/typeDefs/schema";
import { mergeTypes } from "merge-graphql-schemas";

const types = [billCycleTypeDefs,billFormatTypeDefs];

export const typeDefs = mergeTypes(types, { all: true });
 