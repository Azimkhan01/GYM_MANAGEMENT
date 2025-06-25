const cron = require('node-cron');
const dayjs = require('dayjs');
const { membership } = require('../database/registeredUser'); // Adjust path if needed

cron.schedule('0 3 * * *', async () => {
  console.log("🔄 [PROD] Running attendance cleanup...");

  try {
    const members = await membership.find({});

    for (const member of members) {
      const { _id, attendance = [], membership_date, expiry } = member;

      if (!attendance || attendance.length <= 28) continue;

      const memDate = dayjs(membership_date, 'YYYY-MM-DD');
      const expDate = dayjs(expiry, 'YYYY-MM-DD');
      const today = dayjs().format('YYYY-MM-DD');
      const todayObj = dayjs();

      if (!memDate.isValid() || !expDate.isValid()) continue;

      const lastValidDay = expDate.isBefore(todayObj) ? expDate : todayObj;
      const totalDays = lastValidDay.diff(memDate, 'day') + 1;

      const validAttendance = attendance.filter(dateStr => {
        const date = dayjs(dateStr, 'YYYY-MM-DD');
        return date.isValid() && date.isAfter(memDate.subtract(1, 'day')) && date.isBefore(lastValidDay.add(1, 'day'));
      });

      const present = validAttendance.length;
      const absent = totalDays - present;

      const todayAttendance = attendance.includes(today) ? today : null;

      await membership.findByIdAndUpdate(_id, {
        present,
        absent,
        attendance: todayAttendance ? [todayAttendance] : []
      });

      console.log(`✅ [PROD] ${member.name}: Present = ${present}, Absent = ${absent}`);
    }

    console.log("🎉 [PROD] Attendance cleanup completed.");
  } catch (error) {
    console.error("❌ [PROD] Error during attendance cleanup:", error);
  }
});










// const cron = require('node-cron');
// const dayjs = require('dayjs');
// const { membership } = require('../database/registeredUser'); // Adjust path if needed

// cron.schedule('* * * * *', async () => {
//   console.log("🔄 [TEST] Running attendance cleanup...");

//   try {
//     const members = await membership.find({});

//     for (const member of members) {
//       const { _id, attendance = [], membership_date, expiry } = member;

//       if (!attendance || attendance.length <= 1) continue;

//       const memDate = dayjs(membership_date, 'YYYY-MM-DD');
//       const expDate = dayjs(expiry, 'YYYY-MM-DD');
//       const today = dayjs().format('YYYY-MM-DD');
//       const todayObj = dayjs();

//       if (!memDate.isValid() || !expDate.isValid()) continue;

//       const lastValidDay = expDate.isBefore(todayObj) ? expDate : todayObj;
//       const totalDays = lastValidDay.diff(memDate, 'day') + 1;

//       const validAttendance = attendance.filter(dateStr => {
//         const date = dayjs(dateStr, 'YYYY-MM-DD');
//         return date.isValid() && date.isAfter(memDate.subtract(1, 'day')) && date.isBefore(lastValidDay.add(1, 'day'));
//       });

//       const present = validAttendance.length;
//       const absent = totalDays - present;

//       const todayAttendance = attendance.includes(today) ? today : null;

//       await membership.findByIdAndUpdate(_id, {
//         present,
//         absent,
//         attendance: todayAttendance ? [todayAttendance] : []
//       });

//       console.log(`✅ [TEST] ${member.name}: Present = ${present}, Absent = ${absent}`);
//     }

//     console.log("🎉 [TEST] Attendance test cleanup completed.");
//   } catch (error) {
//     console.error("❌ [TEST] Error during attendance cleanup:", error);
//   }
// });
