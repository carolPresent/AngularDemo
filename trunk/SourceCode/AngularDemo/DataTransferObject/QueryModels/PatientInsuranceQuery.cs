using DataTransferObject.Constants;
using DataTransferObject.Interfaces;
using System;

namespace DataTransferObject.QueryModels
{
    public class PatientInsuranceQuery : QueryInterface
    {
        public string _PatientId { get; set; }
        public string _InsuranceId { get; set; }
        public int PatientId { get; set; }
        public int InsuranceId { get; set; }

        public PatientInsuranceQuery() { }

        public PatientInsuranceQuery(string patientId = CommonString.OptionalStringParam, string insuranceId = CommonString.OptionalStringParam)
        {
            _PatientId = patientId;
            _InsuranceId = insuranceId;
        }

        public void SetTypedVariables()
        {
            PatientId = Convert.ToInt32(_PatientId);
            InsuranceId = Convert.ToInt32(_InsuranceId);
        }
    }
}
