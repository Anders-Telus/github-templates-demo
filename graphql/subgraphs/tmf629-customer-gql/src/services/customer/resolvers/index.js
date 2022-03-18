import mutation from "./mutation";
import query from "./query";

const customerResolver = {
    Query: query,
    Mutation: mutation
}

export default customerResolver; 