require("dotenv").config();
const { membership } = require("./database/registeredUser");

// Get a random date within the current year
function getRandomDateThisYear() {
    const year = new Date().getFullYear(); // Should be 2025
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year}-12-31`);
    const diff = end - start;
    const randomTime = Math.random() * diff + start.getTime();
    return new Date(randomTime);
}

// Return a random duration
function getRandomDuration() {
    const durations = ["1-month", "3-months", "6-months", "1-year"];
    return durations[Math.floor(Math.random() * durations.length)];
}

// Calculate expiry based on startDate and duration
function getExpiryDate(startDate, duration) {
    const date = new Date(startDate);
    switch (duration) {
        case "1-month":
            date.setMonth(date.getMonth() + 1);
            break;
        case "3-months":
            date.setMonth(date.getMonth() + 3);
            break;
        case "6-months":
            date.setMonth(date.getMonth() + 6);
            break;
        case "1-year":
            date.setFullYear(date.getFullYear() + 1);
            break;
    }
    return date.toISOString().split('T')[0];
}

// Generate random fees
function getRandomFees() {
    return Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
}

// Get random offer
function getRandomOffer() {
    const offers = ["10% off", "20% off", "Buy 1 Get 1 Free", "Free Trial", "15% off on next purchase"];
    return offers[Math.floor(Math.random() * offers.length)];
}

// Create image path
function getImageURL(id) {
    return `/public/image/${id}.jpg`;
}

// Check for gymName in .env
if (!process.env.gymName) {
    console.error("⚠️  gymName is not defined in .env file!");
    process.exit(1);
}

const data = [];

// Create 1000 entries
for (let i = 1; i <= 1000; i++) {
    const membershipDate = getRandomDateThisYear(); // Date object
    const duration = getRandomDuration();
    const expiry = getExpiryDate(membershipDate, duration);

    const entry = {
        id: `${process.env.gymName}-${i}`,
        name: `Name ${i}`,
        whatsapp: `7${Math.floor(100000000 + Math.random() * 900000000)}`,
        gmail: `user${i}@example.com`,
        membership_date: membershipDate.toISOString().split('T')[0],
        membership_duration: duration,
        fees_paid: getRandomFees(),
        expiry: expiry,
        offer: getRandomOffer(),
        image: getImageURL(i),
    };

    data.push(entry);
}

// Insert into database
(async () => {
    try {
        const enter = await membership.create(data);
        console.log(`✅ Successfully inserted ${enter.length} records`);
    } catch (err) {
        console.error("❌ Failed to insert data:", err);
    }
})();
