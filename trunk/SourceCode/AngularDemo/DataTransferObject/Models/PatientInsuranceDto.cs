namespace DataTransferObject.Models
{
    /// <summary>
    /// Patient insurance DTO class
    /// </summary>
    public class PatientInsuranceDto
    {
        public PatientDto PatientInfo { get; set; }
        public InsuranceDto InsuranceInfo { get; set; }
    }
}
