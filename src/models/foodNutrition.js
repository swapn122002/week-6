const mongoose = require('mongoose')

const foodNutritionSchema = new mongoose.Schema({
  foodId:{
    type: String,
    required: true
  },
  foodItemName: {
      type: String,
      required: true
  },
  foodGroup: {
      type: String,
      required: true
  },
  description: String,
  nutritionalInformation: {
      calories: Number,
      macronutrients: {
          proteins: Number,
          fats: {
              total: Number,
              saturated: Number,
              unsaturated: Number,
              trans: Number
          },
          carbohydrates: Number,
          sugars: Number
      },
      micronutrients: {
          vitamins: {
              type: Map,
              of: Number
          },
          minerals: {
              type: Map,
              of: Number
          },
          other: {
              type: Map,
              of: Number
          }
      },
      fiber: Number,
      sodium: Number,
      cholesterol: Number
  },
  servingSize: String,
  allergens: [String],
  ingredients: [String],
  preparationMethods: [String],
  certifications: [String],
  countryOfOrigin: String,
  brandOrManufacturer: String,
  dietaryRestrictions: [String],
  healthBenefits: [String],
  bestPractices: [String]
});

// foodNutritionSchema.set('primaryKey', 'id');

const food = mongoose.model('food', foodNutritionSchema);
module.exports = food;