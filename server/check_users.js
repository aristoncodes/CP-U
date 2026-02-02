
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cp-universe');
        console.log('Connected to DB');
        const count = await User.countDocuments();
        console.log(`User count: ${count}`);

        if (count > 0) {
            const users = await User.find({}, 'username email handles');
            console.log('Users:', users);
        }
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
};

checkUsers();
