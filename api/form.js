const nodemailer=require('nodemailer');
require("dotenv").config();

//route for sending mail
module.exports= (req,res) =>{
     if(req.method=="POST"){
        let data =req.body;
        //transporter object 
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            //credentials of the sender
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        });
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
            console.log(error);
            } else {
            console.log("Server is ready to take our messages");
            }
        });
        const mail = {
            from: data.name,
            //email of reciever 
            to:process.env.RECP_EMAIL,
            subject: data.subject,
            text: `${data.name} <${data.email}> \n${data.message}`,
        };
        transporter.sendMail(mail, (err, data) => {
            if (err) {
            console.log(err);
            res.status(500).send("Something went wrong.");
            } else {
            res.status(200).send("Email successfully sent to recipient!");
            }
        });
     }
     else{
         res.send("Welcome to serverless contact form")
     }
}