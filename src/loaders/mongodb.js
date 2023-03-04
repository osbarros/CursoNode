const mongoose = require("mongoose")

async function startDB(){
  await mongoose.connect('mongodb+srv://oswaldoneto:cpejr123@cursonodecpe.usda7nw.mongodb.net/test');
}

module.exports = startDB;