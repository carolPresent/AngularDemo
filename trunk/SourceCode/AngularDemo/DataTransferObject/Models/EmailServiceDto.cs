using DataTransferObject.Constants;
using System.Collections.Generic;

namespace DataTransferObject.Models
{
    /// <summary>
    /// This is the email dto which is used to send emails from the system to multiple/single user.
    /// </summary>
    public class EmailServiceDto
    {
        public string Subject { get; set; }
        public string Body { get; set; }
        public string EmailFrom { get; set; }
        public string EmailPassword { get; set; }
        public List<string> EmailTo { get; set; }
        public string SmtpServer { get; set; }
        public int PortNumber { get; set; }
        public bool HtmlEnabled { get; set; }

        /// <summary>
        /// This is the constructor for the email service dto where all the variables are assigned there values.
        /// </summary>
        /// <param name="subject">subject is email subject that shows in the mail headers.</param>
        /// <param name="body">body is the main content part of the email. This contains the information that system will impart to the user.</param>
        /// <param name="emailFrom">emailFrom is the email id of the sender.</param>
        /// <param name="emailPassword">emailPassword is the password associated to the email id of the sender.</param>
        /// <param name="emailTo">emailTo is the list string containing email addresses to which the mail has to be delivered.</param>
        /// <param name="smtpServer">smtpServer is the name of server on which the mail will work upon.</param>
        /// <param name="portNumber">portNumber is the port number on which the mail server will work.</param>
        /// <param name="htmlEnabled">htmlEnabled is the boolean variable that specifies that whether body should be rendered as an html page or plain text.</param>
        public EmailServiceDto(string subject, string body, string emailFrom, string emailPassword, List<string> emailTo, string smtpServer, int portNumber, bool htmlEnabled)
        {
            Subject = subject;
            Body = body;
            EmailFrom = emailFrom;
            EmailPassword = emailPassword;
            EmailTo = emailTo;
            SmtpServer = smtpServer;
            PortNumber = portNumber;
            HtmlEnabled = htmlEnabled;
        }

        /// <summary>
        /// The method converts list of emails to comma seperated emails so that email can be sent to multiple emails.
        /// </summary>
        /// <returns>string of comma(,) seperated emails</returns>
        public string ListToEmailString()
        {
            //Adding first email address to returnItem which have zero index.
            var returnItem = EmailTo[0];
            for (var iterator = 1; iterator < EmailTo.Count; iterator++)
                returnItem = string.Concat(returnItem, CommonString.Comma, EmailTo[iterator]);
            return returnItem;
        }
    }
}
