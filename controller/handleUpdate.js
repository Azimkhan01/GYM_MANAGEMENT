const { membership } = require("../database/registeredUser");
require("dotenv").config();

function getExpiry(startDate, duration) {
  const start = new Date(startDate);

  switch (duration) {
    case "1-month":
      start.setMonth(start.getMonth() + 1);
      break;
    case "3-months":
      start.setMonth(start.getMonth() + 3);
      break;
    case "6-months":
      start.setMonth(start.getMonth() + 6);
      break;
    case "1-year":
      start.setFullYear(start.getFullYear() + 1);
      break;
    default:
      return null;
  }

  const expiryDate = start.toISOString().split("T")[0];
  // console.log(expiryDate)
  return expiryDate;
}

const handleUpdate = async (req, res) => {
  try {
    let name = req.body.name;
    let gmail = req.body.gmail;
    let membership_date = req.body.membership_date;
    let membership_duration = req.body.membership_duration;
    let fees_paid = req.body.fees_paid;
    let whatsapp = req.body.whatsapp;
    let offer = req.body.offer;
    let image = req.body.image;
    let status = req.body.status

    let expiry_date = getExpiry(membership_date, membership_duration);

    if (!expiry_date) {
      res.render("update", {
        gymName: process.env.gymName,
        status: `Invalid membership duration provided for ${name}`,
      });
      return;
    }

    let data = await membership.updateOne(
      {whatsapp:whatsapp},
      {
        name: name,
        gmail: gmail,
        membership_date: membership_date,
        membership_duration: membership_duration,
        fees_paid: fees_paid,
        offer: offer,
        image: image,
        status:status,
        expiry: expiry_date,
      }
    );

    if (data.nModified > 0) {
      res.render("update", {
        gymName: process.env.gymName,
        color: "green",
        status: `Update of ${name} was committed successfully`,
      });
    } else {
      res.render("update", {
        gymName: process.env.gymName,
        status: `Changes Occur For ${name} Kindly Re-check In View Section `,
      });
    }
  } catch (error) {
    res.render("update", {
      gymName: process.env.gymName,
      status: `An error occurred during the update`,
    });
  }
};

module.exports = { handleUpdate };
