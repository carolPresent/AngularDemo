using DataTransferObject.Constants;
using DataTransferObject.Interfaces;
using System;

namespace DataTransferObject.QueryModels
{
    /// <summary>
    /// Class containing fields for querying on insurances.
    /// </summary>
    public class InsuranceQuery : QueryInterface
    {
        public string _Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string PubId { get; set; }
        public int Id { get; set; }

        public InsuranceQuery() { }

        public InsuranceQuery(string id = CommonString.OptionalStringParam, string name = CommonString.OptionalStringParam, 
            string phoneNumber = CommonString.OptionalStringParam, string pubId=CommonString.OptionalStringParam)
        {
            PubId = pubId;
            PhoneNumber = phoneNumber;
            _Id = id;
            Name = name;
        }

        public void SetTypedVariables()
        {
            Id = Convert.ToInt32(_Id);
        }
    }
}
