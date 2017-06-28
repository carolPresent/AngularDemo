using DataTransferObject.Constants;

namespace DataTransferObject.Models
{
    /// <summary>
    /// Reset password Dto for resetting password
    /// </summary>
    public class ResetPasswordDto
    {
        public string Handle { get; set; }
        public string VerificationCode { get; set; }
        public string Password { get; set; }

        public ResetPasswordDto(string handle = CommonString.OptionalStringParam, string verificationCode = CommonString.OptionalStringParam,
            string password = CommonString.OptionalStringParam)
        {
            Handle = handle;
            VerificationCode = verificationCode;
            Password = password;
        }
    }
}
