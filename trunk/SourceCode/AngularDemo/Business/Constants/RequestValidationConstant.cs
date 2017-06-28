namespace Business.Constants
{
    /// <summary>
    /// Constant class having validation constraints for string lengths and integer ranges.
    /// </summary>
    internal class RequestValidationConstant
    {
        public const int MaximumAddressLength = 980;
        public const int MaximumNameLength = 30;
        public const int MaximumInsuranceNameLength = 95;
        public const int PhoneNumberLength = 10;
        public const int InsurancePublicIdLength = 30;
        public const int MinimumId = 1;
        public const int MaximumEmailIdLength = 254;
        public const int VerficationCodeLength = 6;
    }
}
