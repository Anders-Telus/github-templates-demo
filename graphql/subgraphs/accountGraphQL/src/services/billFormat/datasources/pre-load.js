import buildSource from "./index.js";
import seed from "./mongoDB/seed.js";

const data = async (db) => {
  const builtSource = { ...buildSource.db(db) };
  await builtSource.BillFormat.BillFormat.deleteMany({});
  await builtSource.BillFormat.BillFormat.insertMany(seed.billFormats);
};

export default { data };
