const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3200;
app.use(cors())
const food =require('./models/foodNutrition');
require('./db/conn');
app.use(express.json());

// app.use(bodyParser.json());

app.get('/getfoodData',async (req,res)=>{
  try{
    const getfood = await food.find({});
    res.status(201).send(getfood)
  }
  catch(e){
    console.log(e);
  }
})
app.get('/',(req,res)=>{
  res.send('<h1>Welcome</h1>')
})

app.post('/createfood',async (req,res)=>{
  try{
    const addingfoodRecord = new food(req.body);
    const insertData = await addingfoodRecord.save();
    console.log(insertData);
    res.status(201).send(insertData)
  }
  catch(e){
    console.log(e);
  }
})


app.get('/food/:foodId', async (req, res) => {
  try {
      const foodItemId = req.params.foodId;

      const foodItem = await food.findOne({foodId: foodItemId});

      if (!foodItem) {
          return res.status(404).send({ error: 'Food item not found' });
      }

      res.status(200).send(foodItem);
  } catch (e) {
      console.error(e);
      res.status(500).send(e);
  }
});


app.put('/updatefood/:foodId', async (req, res) => {
  try {
    const foodItemId = req.params.foodId;
    const updateData = req.body; // Contains the updated data for the food item

    const updatedFoodItem = await food.findOneAndUpdate({ foodId: foodItemId }, updateData, { new: true });

    if (!updatedFoodItem) {
      return res.status(404).send({ error: 'Food item not found' });
    }

    res.status(200).send(updatedFoodItem);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.delete('/deletefood/:foodId', async (req, res) => {
  try {
    const foodItemId = req.params.foodId;

    const deletedFoodItem = await food.findOneAndDelete({ foodId: foodItemId });

    if (!deletedFoodItem) {
      return res.status(404).send({ error: 'Food item not found' });
    }

    res.status(200).send({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.listen(port,()=>{
  console.log(`server is listening at port number ${port}`);
})