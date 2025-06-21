const attendance = (req,res)=>{
res.render("attendance",{
    gym_name:process.env.gymName
});
}

module.exports = {attendance}