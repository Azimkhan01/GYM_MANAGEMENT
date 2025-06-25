const { cacheDB } = require("../database/registeredUser"); // Adjust path if different

// 🔍 1. Ensure cache document exists
const checkCache = async () => {
  const d = await cacheDB.find({});
  if (d.length === 0) {
    const created = await cacheDB.create({ email: 0 });
    if (created) {
      console.log("📦 Cache document created");
      return true;
    } else {
      console.log("❌ Failed to create cache document");
      return false;
    }
  }
  return true;
};

// 📬 2. Check if mail sending is allowed (limit < 90)
const CanMail = async () => {
  const d = await cacheDB.find({});
  if (d.length === 0) return false;
  return d[0].email <= 90;
};

// ⬆️ 3. Increase email count to 90 if allowed
const increaseMail = async () => {
  const isCacheReady = await checkCache();
  const allowed = await CanMail();

  if (!isCacheReady || !allowed) return false;

  const d = await cacheDB.find({});
  const id = d[0]._id;

  const updated = await cacheDB.updateOne(
    { _id: id },
    { $set: { email: 90 } }
  );

  return updated.acknowledged === true;
};

module.exports = {
  increaseMail,
  CanMail,
  checkCache
};
