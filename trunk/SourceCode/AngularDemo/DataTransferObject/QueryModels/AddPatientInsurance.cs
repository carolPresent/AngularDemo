using DataTransferObject.Constants;

namespace DataTransferObject.QueryModels
{
    public class AddPatientInsurance
    {
        public int PatientId { get; set; }
        public int InsuranceId { get; set; }
        public string InsurancePublicId { get; set; }

        public AddPatientInsurance(int patientId = CommonInteger.OptionalIntegerParam, string insurancePublicId = CommonString.OptionalStringParam,
            int insuranceId = CommonInteger.OptionalIntegerParam)
        {
            PatientId = patientId;
            InsurancePublicId = insurancePublicId;
            InsuranceId = insuranceId;
        }
    }
}
