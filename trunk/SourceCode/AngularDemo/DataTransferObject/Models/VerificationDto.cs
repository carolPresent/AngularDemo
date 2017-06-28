using DataTransferObject.Constants;

namespace DataTransferObject.Models
{
    /// <summary>
    /// Verification dto to make a verification request in order to verify user account
    /// </summary>
    public class VerificationDto
    {
        public string Handle { get; set; }
        public string Password { get; set; }
        public string VerificationCode { get; set; }

        public VerificationDto(string handle = CommonString.OptionalStringParam, string password = CommonString.OptionalStringParam, string verificationCode=CommonString.OptionalStringParam)
        {
            Handle = handle;
            Password = password;
            VerificationCode = verificationCode;
        }
    }
}
