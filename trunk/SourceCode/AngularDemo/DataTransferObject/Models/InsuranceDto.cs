namespace DataTransferObject.Models
{
    /// <summary>
    /// Insurance DTO class
    /// </summary>
    public class InsuranceDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string InsurancePublicId { get; set; }
    }
}
