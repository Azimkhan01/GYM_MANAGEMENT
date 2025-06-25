const { membership } = require("../database/registeredUser");

const attendance = (req, res) => {
    res.render("attendance", {
        gym_name: process.env.gymName
    });
}
const handleAttendance = async (req, res) => {
    const { _id } = req.body;
    // console.log(_id)
    try {
        const member = await membership.findById(_id);
        // console.log(member)
        if (!member) {
            return res.status(404).json({ message: "The member is not found", flag: false });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to start of the day

        const hasMarkedToday = member.attendance.some(date => {
            const recorded = new Date(date);
            recorded.setHours(0, 0, 0, 0);
            return recorded.getTime() === today.getTime();
        });

        if (hasMarkedToday) {
            return res.status(200).json({ message: "Attendance already marked for today", flag: false });
        }

        await membership.findByIdAndUpdate(_id, {
            $push: { attendance: new Date() }
        });

        return res.status(200).json({ message: "Attendance marked successfully", flag: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", flag: false });
    }
};



module.exports = { attendance, handleAttendance }