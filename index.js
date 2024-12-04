import express from "express";
import sendEmail from "./mail/sendMail.js";
import cros from "cors";
const app = express();
const PORT = 3000;
app.use(cros());
app.use(express.json());

app.get("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", (req, res, next) => {
  res.send("Hello World!");
  next();
});
app.post("/mail", (req, res, next) => {
  sendEmail({
    name: req.body.name,
    mail: req.body.mail,
    message: req.body.message,
  });
  res.send(
    JSON.stringify({
      message: true,
    })
  );
  next();
});

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT + "/");
});
