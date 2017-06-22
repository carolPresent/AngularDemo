namespace Business.Constants
{
    internal class ApiRequestKeys
    {
        public const string Address = "Address";
        public const string FirstName = "FirstName";
        public const string MiddleName = "MiddleName";
        public const string LastName = "LastName";
        public const string PhoneNumber = "PhoneNumber";
        public const string Gender = "Gender";
        public const string Age = "Age";
        public const string Id = "Id";
        public const string InsurancePublicId = "InsurancePublicId";
        public const string Name = "Name";
        public const string PatientId = "PatientId";
        public const string InsuranceId = "InsuranceId";
        public const string UserPassword = "UserPassword";
        public const string UserId = "UserId";
    }

    internal class RequestValidationConstant
    {
        public const int MaximumAddressLength = 980;
        public const int MaximumNameLength = 30;
        public const int MaximumInsuranceNameLength = 95;
        public const int PhoneNumberLength = 10;
        public const int InsurancePublicIdLength = 30;
        public const int MinimumId = 1;
    }
}
