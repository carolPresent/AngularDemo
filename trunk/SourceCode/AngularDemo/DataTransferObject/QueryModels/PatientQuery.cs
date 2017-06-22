using DataTransferObject.Constants;
using DataTransferObject.Interfaces;
using System;

namespace DataTransferObject.QueryModels
{
    public class PatientQuery : QueryInterface
    {
        public string _Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public int Id { get; set; }

        public PatientQuery() { }

        public PatientQuery(string id = CommonString.OptionalStringParam, string name = CommonString.OptionalStringParam, string phoneNumber = CommonString.OptionalStringParam)
        {
            _Id = id;
            Name = name;
            PhoneNumber = phoneNumber;
        }

        public void SetTypedVariables()
        {
            Id = Convert.ToInt32(_Id);
        }
    }
}
