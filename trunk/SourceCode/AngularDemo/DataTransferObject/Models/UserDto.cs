namespace DataTransferObject.Models
{
    /// <summary>
    /// UserDto containing information of user.
    /// </summary>
    public class UserDto
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string EmailId { get; set; }
        public string Handle { get; set; }
    }
}
