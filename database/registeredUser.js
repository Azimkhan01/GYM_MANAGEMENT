require("dotenv").config();

const mongoose = require('mongoose');

const mongoDB = process.env.dbString;
mongoose.connect(mongoDB).then(() => {
    console.log("Connected to sql succesfully")
});

const registeredSchema = new mongoose.Schema({
    id: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true,
    },
    whatsapp: {
        type: String,
        trim: true,
    },
    gmail: {
        type: String,
        trim: true,
    }, membership_date: {
        type: String,
        trim: true,
    }, membership_duration: {
        type: String,
        trim: true,
    },
    fees_paid: {
        type: String,
        trim: true,
    }, expiry: {
        type: String,
        trim: true
    }, offer: {
        type: String,
        trim: true,
    }, image: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        trim: true
    }, total_days: {
        type: Number,
        trim: true
    },
    attendance: {
        type: [String]
    },
    present:Number,
    absent:Number,
},
    {
        timestamps: true,
        strict: false
    }
);


const allData = new mongoose.Schema({}, { strict: false })

const membership = mongoose.model("membership", registeredSchema);
const cacheDB = new mongoose.model('allData', allData)

module.exports = { membership, cacheDB };