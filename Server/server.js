const express = require('express');
const mongojs = require("mongojs");
 // used proxy(on localhost port 3001) in package.json instead of installing CORS. 
//If you use the shared mongodb server:
const db = mongojs(
  'mongodb+srv://kfir42_db_user:TYd5u3NJEW3cjLQ6@cluster0.ahyy6rv.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0',['shop']);
//Edit this line to point to your specific collection!
const tasks_coll = db.collection('shop'); 

const app = express();
app.use(express.json()); // Middleware to parse JSON body

// GET route to fetch all products from the MangoDB
app.get('/products', (req, res) => {
  db.shop.find({}, (error, docs) => {
    if (error) {
      console.error('MongoDB query error:', error);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(docs);
  });
});
// POST route to post the order on MangoDB
app.post('/orders' , async (req, res) =>{
  const order = await req.body;
  await db.collection("orders").insert(order, (err,doc) => {
    res.status(200).json()
  } )
  
})

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
