using DataTransferObject.Constants;
using System.Collections.Generic;

namespace DataTransferObject.Models
{
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
        /// <returns>string of comma i.e. ',' emails</returns>
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
