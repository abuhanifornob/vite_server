const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = 5000;

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
    const userInfoDB = client.db("userInfoDB");
    const userInfoCollection = userInfoDB.collection("UserInfoCollection");
    // Add products
    app.post("/shoes", async (req, res) => {
      const shoe = req.body;

      const result = await shoesCollection.insertOne(shoe);
      res.send(result);
    });

    app.get("/shoes", async (req, res) => {
      const shoesData = shoesCollection.find();
      const result = await shoesData.toArray();
      res.send(result);
    });

    app.get("/shoe/:id", async (req, res) => {
      const id = req.params.id;
      const result = await shoesCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.patch("/shoe/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const filter = { _id: new ObjectId(id) };
      const result = await shoesCollection.updateOne(filter, {
        $set: updateData,
      });
      res.send(result);
    });

    app.delete("/shoe/:id", async (req, res) => {
      const id = req.params.id;
      const quary = { _id: new ObjectId(id) };
      const result = await shoesCollection.deleteOne(quary);
      res.send(result);
    });

    // User Information;
    app.post("/users", async (req, res) => {
      const user = req.body;
      const email = user?.email;
      const isUserExists = await userInfoCollection.findOne({ email });
      if (isUserExists) {
        res.send({
          status: "success",
          message: "Login Successful",
        });
      } else {
        const resut = await userInfoCollection.insertOne(user);
        res.send(resut);
      }
    });
    app.get("/users/get/:id", async (req, res) => {
      const id = req.params.id;
      const result = await userInfoCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });
    app.patch("/users/update/:id", async (req, res) => {
      const id = req.params.id;
      const updateDoc = req.body;
      const filter = { _id: new ObjectId(id) };
      const result = await userInfoCollection.updateOne(filter, {
        $set: updateDoc,
      });
      res.send(result);
    });
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const result = await userInfoCollection.findOne({ email });
      res.send(result);
    });

    console.log(" You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("App is Running");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//hanifcse90
//Xf9RXAryqwRJvY2F
