// const { attachment } = require("express/lib/response");
const nodemailer = require("nodemailer");
require("dotenv").config();

// async..await is not allowed in global scope, must use a wrapper
async function expAlert(name, date, duration, expiry, mail) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.email,
            pass: process.env.emailPass,
        },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: process.env.email, // sender address
        to: mail, // list of receivers
        subject: "Important Notice", // Subject line
        text: `The ${process.env.gymName} Gym`, // plain text body
        html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Important Membership Expiry Notification</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #e0f7fa, #b9fbc0); /* Light teal to light green gradient */
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        overflow: hidden;
    }
    .notification-container {
        background-color: #ffffff; /* White */
        border: 2px solid #0288d1; /* Deep blue */
        border-radius: 12px;
        max-width: 600px;
        width: 90%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        padding: 20px;
        margin: 20px;
        text-align: center;
        color: #333;
        position: relative;
        animation: bounceIn 1s ease-in-out;
    }
    .notification-container img {
        width: 100%;
        height: auto;
        border-radius: 12px;
        margin-bottom: 20px;
        border: 5px solid #0288d1; /* Deep blue border */
    }
    h2 {
        color: #0288d1; /* Deep blue */
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: bold;
        animation: shake 1s ease-in-out;
    }
    p, ul {
        font-size: 16px;
        color: #333;
    }
    strong {
        color: #ffab00; /* Warm yellow */
    }
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    li {
        padding: 10px 0;
        border-bottom: 1px solid #e0f2f1; /* Light teal */
    }
    .highlight {
        color: #ffab00; /* Warm yellow */
        font-weight: bold;
    }
    .contact-info {
        font-size: 16px;
        color: #333;
        margin-top: 20px;
    }
    .contact-info strong {
        color: #0288d1; /* Deep blue */
    }
    .notification-container::before {
        content: "⚠️";
        font-size: 40px;
        color: #0288d1; /* Deep blue */
        position: absolute;
        top: 10px;
        left: 10px;
    }

    /* Animation Definitions */
    @keyframes bounceIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes shake {
        0% { transform: translateX(-10px); }
        50% { transform: translateX(10px); }
        100% { transform: translateX(0); }
    }

    /* Responsive Styles */
    @media (max-width: 600px) {
        .notification-container {
            padding: 15px;
            margin: 10px;
        }
        h2 {
            font-size: 20px;
        }
        p, ul {
            font-size: 14px;
        }
        .contact-info {
            font-size: 14px;
        }
    }
</style>
</head>
<body>
<div class="notification-container">
    <img src="https://t4.ftcdn.net/jpg/00/99/82/15/360_F_99821575_nVEHTBXzUnTcLIKN6yOymAWAnFwEybGb.jpg" alt="Gym Image">
    <h2>Important Membership Expiry Notification</h2>
    <p>Dear <span class="highlight">${name}</span>,</p>
    <p>This is an important notification from <strong>The ${process.env.gymName} Gym</strong> to inform you that your membership is nearing its expiry date. Immediate action is required.</p>
    <ul>
        <li><strong>Name:</strong> <span class="highlight">${name}</span></li>
        <li><strong>Date of Admission:</strong> <span class="highlight">${date}</span></li>
        <li><strong>Duration:</strong> <span class="highlight">${duration}</span></li>
        <li><strong>Expiry Date:</strong> <span class="highlight">${expiry}</span></li>
    </ul>
    <p class="contact-info">Please visit the gym or contact us at <strong>info@process.env.gymNamegym.com</strong> to renew your membership before the expiry date to ensure uninterrupted access to our facilities.</p>
    <p>Thank you for your prompt attention to this matter.</p>
</div>
</body>
</html>
`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

async function main(name, date, duration, expiry, mail) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.email,
            pass: process.env.emailPass,
        },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: process.env.email, // sender address
        to: mail, // list of receivers
        subject: "Important Notice", // Subject line
        text: `The ${process.env.gymName} Gym`, // plain text body
        html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to The ${process.env.gymName} Gym</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #e0f7fa, #b9fbc0); /* Light teal to light green gradient */
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        overflow: hidden;
    }
    .greeting-container {
        background-color: #ffffff; /* White */
        border: 2px solid #0288d1; /* Deep blue */
        border-radius: 12px;
        max-width: 600px;
        width: 90%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        padding: 20px;
        margin: 20px;
        text-align: center;
        color: #333;
        position: relative;
    }
    .greeting-container img {
        width: 100%;
        height: auto;
        border-radius: 12px;
        margin-bottom: 20px;
        border: 5px solid #0288d1; /* Deep blue border */
    }
    h2 {
        color: #0288d1; /* Deep blue */
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: bold;
    }
    p {
        font-size: 16px;
        color: #333;
        margin: 10px 0;
    }
    strong {
        color: #ffab00; /* Warm yellow */
    }
    .highlight {
        color: #ffab00; /* Warm yellow */
        font-weight: bold;
    }
    /* Responsive Styles */
    @media (max-width: 600px) {
        .greeting-container {
            padding: 15px;
            margin: 10px;
        }
        h2 {
            font-size: 20px;
        }
        p {
            font-size: 14px;
        }
    }
</style>
</head>
<body>
<div class="greeting-container">
    <img src="https://t4.ftcdn.net/jpg/00/99/82/15/360_F_99821575_nVEHTBXzUnTcLIKN6yOymAWAnFwEybGb.jpg" alt="Gym Image">
    <h2>Welcome to The ${process.env.gymName} Gym!</h2>
    <p>Dear <span class="highlight">${name}</span>,</p>
    <p>Thank you for choosing <strong>The ${process.env.gymName} Gym</strong> as your fitness partner. We are thrilled to have you with us!</p>
    <p>Here are the details of your membership:</p>
    <p><strong>Name:</strong> <span class="highlight">${name}</span></p>
    <p><strong>Date of Admission:</strong> <span class="highlight">${date}</span></p>
    <p><strong>Duration:</strong> <span class="highlight">${duration}</span></p>
    <p><strong>Start Date:</strong> <span class="highlight">${date}</span></p>
    <p><strong>Expiry Date:</strong> <span class="highlight">${expiry}</span></p>
    <p>We are committed to providing you with the best fitness experience. If you have any questions or need assistance, please do not hesitate to contact us at <strong>info@${process.env.gymName}.com</strong>.</p>
    <p>Welcome aboard, and here's to your fitness journey!</p>
</div>
</body>
</html>

`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

async function backup(data) {
    // console.log("backup is sended")
    try {
        let date = new Date();
        let today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
        )}-${String(date.getDate()).padStart(2, "0")}`;
        const jsonData = JSON.stringify(data, null, 2);

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.email,
                pass: process.env.emailPass,
            },
        });

        const info = await transporter.sendMail({
            from: process.env.email,
            to: "azimuddenk@gmail.com",
            subject: "Important Notice",
            text: `The ${process.env.gymName} Gym - ${today}`,
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Gym Management System</title>
                <style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        color: #333;
        padding: 0;
        margin: 0;
    }

    .container {
        padding: 20px;
        margin: 20px auto;
        max-width: 1200px;
        background-color: #fff;
        border-radius: 8px;
        border: 1px solid #ddd;
    }

    .header-info {
        background-color: #007BFF;
        color: white;
        padding: 15px;
        text-align: center;
        border-radius: 8px 8px 0 0;
        margin-bottom: 20px;
    }

    .header-info h1 {
        margin: 0;
        font-size: 24px;
    }

    .stats-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .stats-box {
        background-color: #e9ecef;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        text-align: center;
        flex: 1;
        max-width: 300px;
    }

    .stats-box h3 {
        margin-bottom: 10px;
        font-size: 18px;
    }

    .stats-box p {
        font-size: 16px;
        font-weight: bold;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    th, td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #007BFF;
        color: white;
    }

    tr:hover {
        background-color: #f1f1f1;
    }

    .additional-sections h2 {
        color: #7420FF;
        margin-top: 20px;
    }
</style>

            </head>
            <body>
                <div class="container">
                    <!-- New Section at the Top -->
                    <div class="header-info">
                        <h1>The ${process.env.gymName} Gym - ${today}</h1>
                    </div>

                    <!-- Statistics Section -->
                    <div class="stats-container">
                        <div class="stats-box">
                            <h3>Total Members</h3>
                            <p id="totalMembers">${data.length}</p>
                        </div>
                    </div>

                    <!-- Membership Entries Section -->
                    <div class="additional-sections">
                        <h2 style="color: rgb(116, 30, 255);" id="entry">Last 10 Membership Entries</h2>
                        <table id="membershipTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>WhatsApp</th>
                                    <th>Membership Date</th>
                                    <th>Expiry Date</th>
                                </tr>
                            </thead>
                            <tbody id="tableBody">
                                ${data
                    .slice(-10)
                    .map(
                        (entry) => `
                                <tr>
                                    <td>${entry.id}</td>
                                    <td>${entry.name}</td>
                                    <td>${entry.gmail}</td>
                                    <td>${entry.whatsapp}</td>
                                    <td>${entry.membership_date}</td>
                                    <td>${entry.expiry}</td>
                                </tr>`
                    )
                    .join("")}
                            </tbody>
                        </table>
                         <h2 style="color: rgb(116, 30, 255);" id="entry">Membership Entries</h2>
                        <table id="membershipTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>WhatsApp</th>
                                    <th>Membership Date</th>
                                    <th>Expiry Date</th>
                                </tr>
                            </thead>
                            <tbody id="tableBody">
                                ${data
                    .map(
                        (entry) => `
                                <tr>
                                    <td>${entry.id}</td>
                                    <td>${entry.name}</td>
                                    <td>${entry.gmail}</td>
                                    <td>${entry.whatsapp}</td>
                                    <td>${entry.membership_date}</td>
                                    <td>${entry.expiry}</td>
                                </tr>`
                    )
                    .join("")}
                            </tbody>
                        </table>
                    </div>
                </div>
            </body>
            </html>
            `,
            attachments: [
                {
                    filename: `${process.env.gymName}.json`,
                    content: jsonData,
                    contentType: "application/json",
                },
            ],
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

async function reminderExpiry(toMail, name, expiry) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.email,
            pass: process.env.emailPass,
        },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: process.env.email,
        to: toMail,
        subject: `Important Notice from ${process.env.gymName}`,
        text: `Dear ${name}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gym Membership Expiry Reminder</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333;">

    <!-- Email container -->
    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f9; padding: 20px 0;">
        <tr>
            <td align="center">

                <!-- Inner container -->
                <table width="90%" max-width="600px" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px;">
                    <tr>
                        <td style="background-color: #4a90e2; color: white; text-align: center; padding: 20px; font-size: 24px; font-weight: bold; border-radius: 10px 10px 0 0;">
                            Membership Expiry Reminder
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: left; color: #333; font-size: 16px; line-height: 1.6;">
                            <p>Dear <strong>${name}</strong>,</p>
                            <p>We hope you have been enjoying your time at our gym. This is a reminder that your gym membership will expire on <strong>${expiry}</strong>.</p>
                            <p>To avoid any interruption in access to our facilities, we encourage you to renew your membership before the expiry date.</p>
                            <p>We look forward to continuing to help you reach your fitness goals!</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <a href="#" style="background-color: #4a90e2; color: white; text-decoration: none; padding: 12px 30px; font-size: 16px; border-radius: 5px;">Renew Now</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: center; font-size: 14px; color: #777;">
                            <p>For any questions, feel free to contact us at <a href="mailto:support@gym.com" style="color: #4a90e2; text-decoration: none;">support@gym.com</a>.</p>
                            <p>Thank you for being a valued member of our gym community.</p>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>

</body>
</html>

`,
    });
    console.log("Message sent: %s", info.messageId);
}

// reminder("azimkarimrahim@gmail.com","azim khan","1-1-2002")
module.exports = { main, expAlert, backup, reminderExpiry };
