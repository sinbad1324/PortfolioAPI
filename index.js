import express from "express";
import sendEmail from "./mail/sendMail.js";
import cros from "cors";
import VerifyMailData from "./plugin/verifyValidMail.js"
import requestIp from "request-ip"

const app = express();
const PORT = 3000;
app.use(cros());
app.use(express.json());
app.use(requestIp.mw())
app.get("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
  const mailData = {
    name: "houssein",
    mail: "Hass",
    message: "Yo man",
  }
  // console.log(VerifyMailData(ip, mailData));
  
  console.log(VerifyMailData(ip, mailData))

  res.send(toString(ip));
  next();
});

app.post("/mail", (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
  const mailData = {
    name: req.body.name,
    mail: req.body.mail,
    message: req.body.message,
  }
  if (VerifyMailData(ip, mailData)) {
    sendEmail(mailData).then((response) => {
      res.send(
        JSON.stringify({
          message: response,
        })
      );
      next();
    })
  } else {
    res.send(
      JSON.stringify({
        message: "We're sorry but we had a problem, try again in 1 min!!!!! xD (:>>>>>)",
      }))

    next();
  }
});

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT + "/");
});
