import fs from 'fs';
const authData = JSON.parse(fs.readFileSync(new URL('./../secret/authMail.json', import.meta.url)));
// import postmark from "postmark";
import postmark from "postmark";

const sendEmail = async (data) => {
  try {
    const client = new postmark.ServerClient(authData.APIKey);
    const response = client.sendEmail({
      From: authData.mail,
      To: authData.mail,

      Subject: "A new client",
      HtmlBody: `
        <div>
            <div>
                <h1>My name is <strong>${data.name}</strong></h1></br>
                <h2>My E-mail is <a href="mailto:${data.mail}">${data.mail}</a></h2>
            </div></br>
            <p>
                ${data.message}
            </p>
        </div>
      `,
      TextBody: "",
      MessageStream: "outbound",
    });
    return response;
  } catch (error) {
    console.error("Erreur lors de l’envoi de l’email:", error.message);
  }
  return false;
};

export default sendEmail;
