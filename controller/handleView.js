const { increaseMail, CanMail } = require("./handleCache");

const handleView = async (req, res) => {
  const members = req.body;

  const allow = await CanMail();
  if (!allow) {
    return res.render("view", {
      gymName: process.env.gymName,
      status: "Limit reached. Try again later.",
      color: "red"
    });
  }

  for (const member of members) {
    await expAlert(
      member.name,
      member.membership_date,
      member.membership_duration,
      member.expiry,
      member.gmail
    );
  }

  await increaseMail(); // Log the usage

  return res.render("view", {
    gymName: process.env.gymName,
    status: "Mail sent to visible members",
    color: "green"
  });
};


module.exports = {handleView}