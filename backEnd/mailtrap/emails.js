import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import {mailtrapClient, sender} from "./mailtrap.config.js"
export const sendVerificationEmail = async (email,verificationToken) =>{
    const recipient = [{email}]
    try{
        const response = await mailtrapClient.send({
            from:sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category: "Email verification"
        })
        console.log("Email sent successfully", response);

    }catch(error){
        console.error("Error sending email verification:",error.message);
        res.status(400).json({Error: `Error sending verification email: ${error}`});
    }
}


export const sendWelcomeEmail = async(email,name) =>{
 const recipient = [{email}];
    try {
       const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "2c8e1366-1275-4732-8b82-b95a0b825a37",
            template_variables: {
                   company_info_name: "TravCalc",
                   name: name,     
            }
        });
        console.log("Welcome Email sent  succesfully", response);

    } catch (error) {
        console.error("Error sending welcome Email",error);
        res.status(400).json({message: `Error sending welcome email: ${error}`});
    }
}

export const sendPasswordResetEmail = async(email, resetURL) => {
    const recipient = [{email}]
    try{
        const response = await mailtrapClient.send({
            from:sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category: "Password Reset",
        })
        console.log("Email sent successfully", response);

    }catch(error){
        console.error("Error sending password reset email:",error.message);
        res.status(400).json({Error: `Error sending password reset email: ${error}`});
    }
}

export const sendResetSuccessful = async(email) => {
    const recipient = [{email}]
    try{
        const response = await mailtrapClient.send({
            from:sender,
            to: recipient,
            subject: "Password Reset successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        })
        console.log(" Reset success password Email sent successfully", response);

    }catch(error){
        console.error("Error sending password reset success email:",error.message);
        res.status(400).json({Error: `Error sending password reset success email: ${error}`});
    }
}