using DataTransferObject.Constants;

namespace DataTransferObject.QueryModels
{
    /// <summary>
    /// Model to add a new patient insurance.
    /// </summary>
    public class AddPatientInsurance
    {
        public int PatientId { get; set; }
        public int InsuranceId { get; set; }
        public string InsurancePublicId { get; set; }
        public int Id { get; set; }

        public AddPatientInsurance(int patientId = CommonInteger.OptionalIntegerParam, string insurancePublicId = CommonString.OptionalStringParam,
            int insuranceId = CommonInteger.OptionalIntegerParam)
        {
            PatientId = patientId;
            InsurancePublicId = insurancePublicId;
            InsuranceId = insuranceId;
        }
    }
}
