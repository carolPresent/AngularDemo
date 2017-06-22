namespace DataTransferObject.Models
{
    /// <summary>
    /// Patient DTO class
    /// </summary>
    public class PatientDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        public byte Age { get; set; }
        public string PhoneNumber { get; set; }
    }
}
