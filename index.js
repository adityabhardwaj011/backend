import express from "express";
const app = express()
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors"

app.listen(8080,()=>{
    console.log("server started at port 8080")
})

app.use(express.json());
app.use(cors());

// const uri = "mongodb://127.0.0.1:27017"
const uri = "mongodb+srv://adityab790:Xt9yFsiUmznCHy41@cluster0.lrk9m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri)
const db = client.db("ecomm")



// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.get("/", async(req,res)=>{
    const items = await db.collection("products").find().toArray()
    res.status(200).json(items);
});

app.post("/", async (req, res) => {
    const { name, price,desc,url } = req.body;
    const data = {
      name: name,
      price: price,
      desc:desc,
      url:url,
    };
    const newProduct = await db.collection("products").insertOne(data);
    res.status(200).json(newProduct);
  });
  
  
  app.delete("/:id", async (req, res) => {
      const id = req.params.id;
      const newProduct = await db.collection("products").deleteOne({_id:new ObjectId(id)});
      res.status(200).json(newProduct);
    });


