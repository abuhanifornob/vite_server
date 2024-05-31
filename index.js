const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://hanifcse90:Xf9RXAryqwRJvY2F@cluster0.qsszyiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productDB = client.db("productDB");
    const shoesCollection = productDB.collection("shoesCollection");
    // Add products
    app.post("/shoes", async (req, res) => {
      const shoe = req.body;
      console.log(shoe);
      const result = await shoesCollection.insertOne(shoe);
      res.send(result);
    });

    console.log(" You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//hanifcse90
//Xf9RXAryqwRJvY2F
