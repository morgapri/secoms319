const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Product = require("./dataSchema.js");
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose.connect("mongodb://127.0.0.1:27017/reactdata",
{
dbName: "reactdata",
useNewUrlParser: true,
useUnifiedTopology: true,
}
);
const port = process.env.PORT || 4000;
const host = "localhost";


app.get("/", async (req, resp) => {
const query = {};
const allProducts = await Product.find(query);
console.log(allProducts);
resp.send(allProducts);
});

app.get("/:id", async (req, resp) => {
    const id = req.params.id;
    const query = { _id: id };
    const oneProduct = await Product.findOne(query);
    console.log(oneProduct);
    resp.send(oneProduct);
});

app.put("/update", async (req, res) => {
    console.log("Update :", req.body._id);
    console.log("New Price :", req.body.price);

    try{
        const filter = { _id: `${req.body._id}` };
        const updateDoc = { $set: { amount: `${req.body.amount}`} };
        await Product.updateOne(filter, updateDoc, null);
        const messageResponse = {
            message: `Product ${req.body_id} updated correctly`
        };
    } catch (err) {
        console.log("Error while updating :" + p_id + " " + err);
    }
});

app.post("/insert", async (req, res) => {
    console.log("Add Review :", req.body._id);
    console.log("New Review :", req.body.price);
   try {
    const filter = {_id: `${req.body._id}`};
    const updateDoc = {$push : {rating: `${req.body.rating}`}};
    await Product.updateOne(filter, updateDoc, null);
   }
   catch (err){
    console.log("Error while updateing: " + p_id + " " + err);
   }
});


app.listen(port, () => {
console.log(`App listening at http://%s:%s`, host, port);
});