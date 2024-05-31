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

    const userDB = client.db("userDB");
    const userCollection = userDB.collection("userCollection");
    app.post("/user", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      console.log(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/users", (req, res) => {
  const user = {
    name: "Abu hanif",
    id: "624",
    contact: "01716203929",
  };
  res.send(user);
});
app.get("/admin", (req, res) => {
  res.send("This is Admin Panel, ");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//hanifcse90
//Xf9RXAryqwRJvY2F
