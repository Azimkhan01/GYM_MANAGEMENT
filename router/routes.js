const express = require("express");
const path = require('path');
const { admin } = require("../controller/admin");
const { handleAdmin } = require("../controller/handleAdmin");
const { insert } = require("../controller/insert");
const { handleInsert } = require("../controller/handleInsert");
const { update } = require("../controller/update");
const { handleUpdate } = require("../controller/handleUpdate");
const { remove } = require("../controller/remove");
const { handleRemove } = require("../controller/handleremove");
const { view } = require("../controller/view");
const { handleView } = require("../controller/handleView");
const { dashboard } = require("../controller/dashboard");
const { handleDashboard } = require("../controller/handleDashboard");
const { memberApi } = require("../controller/memberApi");
const {membership} = require("../database/registeredUser");
const router = express.Router();
const multer = require("multer");
const { attendance, handleAttendance } = require("../controller/attendance");
const { backupSend } = require("../controller/backup");
require("dotenv").config();



    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const filePath =  path.join(__dirname, '../public/image/');
          return cb(null, filePath)
        },
        filename:async function (req, file, cb) {
            let id = await  membership.countDocuments({}) + 1;
            id = process.env.gymName+"-"+id+".jpg";
          cb(null,id)
        }
      })
      
      const upload = multer({ storage: storage });



router.route("/").get(admin);
router.route("/").post(handleAdmin);
router.route("/dashboard").get(dashboard);
router.route("/dashboard").post(handleDashboard);
router.route("/insert").get(insert);
router.route("/insert").post(upload.single('uploaded_file'),handleInsert);
router.route("/update").get(update);
router.route("/update").post(handleUpdate);
router.route("/remove").get(remove);
router.route("/remove").post(handleRemove);
router.route("/member").get(view);
router.route("/member").post(handleView);
router.route("/attendance").get(attendance);
router.route("/attendance").post(handleAttendance);
router.route('/backup').get(backupSend)

router.route("/memberApi").get(memberApi);

module.exports = {router}