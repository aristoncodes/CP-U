require('dotenv').config();
const mongoose = require('mongoose');
const Problem = require('./models/Problem');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cp-universe')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => { console.error(err); process.exit(1); });

const cp31 = require('./data/cp31-data.json');

const seedCP31 = async () => {
  try {
    await Problem.deleteMany({});
    console.log('🧹 Cleared existing problems');
    await Problem.insertMany(cp31);
    console.log(`🌱 Seeded ${cp31.length} CP-31 problems!`);
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedCP31();
