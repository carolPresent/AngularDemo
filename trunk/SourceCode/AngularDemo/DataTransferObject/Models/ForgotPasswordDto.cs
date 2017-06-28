using DataTransferObject.Constants;

namespace DataTransferObject.Models
{
    /// <summary>
    /// Forgot password dto to make a forgot password request
    /// </summary>
    public class ForgotPasswordDto
    {
        public string Handle { get; set; }

        public ForgotPasswordDto(string handle = CommonString.OptionalStringParam)
        {
            Handle = handle;
        }
    }
}
