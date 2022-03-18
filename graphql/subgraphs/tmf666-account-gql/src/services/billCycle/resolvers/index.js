import mutation from "./mutation";
import query from "./query";

const billCycleResolver = {
    Query: query,
    Mutation: mutation
}

export default billCycleResolver; 