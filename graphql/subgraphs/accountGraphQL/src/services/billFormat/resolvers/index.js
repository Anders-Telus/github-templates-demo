import mutation from "./mutation";
import query from "./query";

const billFormatResolver = {
    Query: query,
    Mutation: mutation
}

export default billFormatResolver; 