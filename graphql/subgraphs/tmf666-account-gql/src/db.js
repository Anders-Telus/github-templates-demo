import  MongoClient  from 'mongodb';

  let dbConnection;

 const connectToDB = async (url) => {
  const client = new MongoClient(url, { useNewUrlParser: true })
  await client.connect()
  dbConnection = client.db()
  return client
}

export default () => {
dbConnection,
connectToDB
}

export{dbConnection,connectToDB};



