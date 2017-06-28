using DataTransferObject.Constants;

namespace DataTransferObject.Models
{
    /// <summary>
    /// Login DTO class
    /// </summary>
    public class LoginDto
    {
        public string LoginHandle { get; set; }
        public string LoginPassword { get; set; }

        public LoginDto() { }

        public LoginDto(string loginHandle = CommonString.OptionalStringParam, string loginPassword=CommonString.OptionalStringParam)
        {
            LoginHandle = loginHandle;
            LoginPassword = loginPassword;
        }
    }
}
