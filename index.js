const express = require("express");
const admin = require("firebase-admin");
const app = express();
const port = 3000;
const serviceAccount = require("./gofix-mechanic-76e86-firebase-adminsdk-6fde5-9a90c782c9.json");


admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://gofix-mechanic-76e86-default-rtdb.firebaseio.com/"
});

var registrationTokenGoFixMecha = "dMDZEJnvSnWUWzeQow9oiQ:APA91bEul7YT2UAOs7hU0zwkNoHbtbJlFE5LnwZBIgHSq0emOxtuBIXRp7VIVk8DU4qjIPgA2vL0i1c2NsS_lfKS47JZkzH5n6eXYw-92EP_DlJ0vVBwS2XSvWvj5cMbkSdZaBtxmvu3";
// var registrationTokenGoFix = "f5QjVFLAQWS4Ld_sScPqlc:APA91bGlqoE-m3CyLrrwT3_EEHsRGhYUewYOOa9Nt0x-eYuO8iA9iYzXG82j1PXJoQaX6kxz_ArRTQCWKlUttcNbdL6RS7-_lJFuJspfGevtAFpEmhdpHmonaXkDeaIJkuOLDZ2-jiXv";

app.get("/", async (req, res) => {
   var payload = {
      notification: {
         title: "Bạn có một đơn hàng mới.",
         body: "Trần Đại Đăng có một yêu cầu sửa chữa cho bạn. Vị trí cách bạn 5km."
      },
      data: {
         account: "Savings",
         balance: "$3020.25"
      }
   };

   var options = {
      priority: "high",
      timeToLive: 60 * 60 * 24
   };

   admin.messaging().sendToDevice(registrationTokenGoFixMecha, payload, options)
      .then(function (response) {
         res.send(`Successfully sent message: ${response}`);
      })
      .catch(function (error) {
         res.send(`Error sending message: ${error}`);
      });
});

app.listen(port, () => {
   console.log(
      `Example app listening at http://localhost:${port}`
   );
});
