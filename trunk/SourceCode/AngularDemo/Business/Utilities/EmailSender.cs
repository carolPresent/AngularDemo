using DataTransferObject.Models;
using System;
using System.Net;
using System.Net.Mail;

namespace Business.Utilities
{
    /// <summary>
    /// The class to send emails.
    /// </summary>
    internal class EmailSender
    {
        private EmailServiceDto EmailInfo { get; set; }

        /// <summary>
        /// Constructor for email sender class
        /// </summary>
        /// <param name="subject">subject is the subbject related to the email</param>
        /// <param name="body">body is the body content of the email</param>
        /// <param name="emailFrom">emailFrom is the email address of the sender</param>
        /// <param name="emailPassword">emailPassword is the password of the sender</param>
        /// <param name="emailTo">emailTo is the list of emails to send to</param>
        /// <param name="smtpServer">smtpServer is the name of the SMTP server to use in order to send emails</param>
        /// <param name="portNumber">portNumber is the port number for emailing</param>
        /// <param name="htmlEnabled">htmlEnabled is the boolean flag to flag whether html is enabled or not</param>
        public EmailSender(EmailServiceDto emailInfo)
        {
            EmailInfo = emailInfo;
        }

        /// <summary>
        /// Method to send email.
        /// </summary>
        /// <returns>boolean status whether email was sent or not</returns>
        public bool Send()
        {
            var mail = new MailMessage();
            var smtpServer = new SmtpClient(EmailInfo.SmtpServer);
            mail.From = new MailAddress(EmailInfo.EmailFrom);
            mail.To.Add(EmailInfo.ListToEmailString());
            mail.Subject = EmailInfo.Subject;
            mail.Body = EmailInfo.Body;
            mail.IsBodyHtml = EmailInfo.HtmlEnabled;
            smtpServer.Port = EmailInfo.PortNumber;
            smtpServer.Credentials = new NetworkCredential(EmailInfo.EmailFrom, EmailInfo.EmailPassword);
            smtpServer.EnableSsl = true;
            try
            {
                smtpServer.Send(mail);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

    }
}
