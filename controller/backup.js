const { membership, cacheDB } = require("../database/registeredUser");
const { checkCache } = require("./handleCache");
const { backup } = require("./mailService");

const backupSend = async (req, res) => {
  try {
    const allData = await membership.find({});

    if (!allData || allData.length === 0) {
      return res.status(404).json({ flag: false, message: "No membership data found" });
    }

    const c = await checkCache;

    if (!c) {
      return res.status(500).json({ flag: false, message: "Server error while checking cache" });
    }

    const cacheData = await cacheDB.findOne({});
    if (!cacheData || !cacheData.backup) {
      // No backup date found, proceed with the backup
    } else {
      const lastBackup = new Date(cacheData.backup);
      const currentTime = new Date();
      const diffTime = currentTime - lastBackup;
      const diffMinutes = diffTime / (1000 * 60); // Convert milliseconds to minutes

      if (diffMinutes < 30) {
        return res.status(403).json({ flag: false, message: "Backup already performed recently. Please try again in 30 minutes." });
      }
    }

    // Update the cacheDB with the new backup timestamp
    await cacheDB.updateOne({ _id: cacheData._id }, { $set: { backup: new Date() } });

    // Perform the backup
    await backup(allData);

    return res.status(200).json({ flag: true, message: "Backup sent successfully" });
  } catch (error) {
    console.error("Backup send error:", error);
    return res.status(500).json({ flag: false, message: "Server error while sending backup" });
  }
};

module.exports = { backupSend };
