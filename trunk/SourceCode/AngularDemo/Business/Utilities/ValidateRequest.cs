using Business.Constants;
using DataTransferObject.Models;
using DataTransferObject.QueryModels;
using System.Text.RegularExpressions;

namespace Business.Utilities
{
    /// <summary>
    /// Internal class for validating request model manually.
    /// All methods return a Pair, where First contains boolean value of validation status and Second contains Api key name where error occured.
    /// If request succeeds it return the model passed in argument itself
    /// Data annotations can be used also.
    /// </summary>
    internal class ValidateRequest
    {
        /// <summary>
        /// Validates PatientDto sent in POST request
        /// </summary>
        /// <param name="patientDto">patientDto contains information of a new patient to be added</param>
        /// <returns>Pair of {status:boolean,ApiKeyName/PatientDto} </returns>
        public static Pair ValidatePatientDto(PatientDto patientDto)
        {
            var returnSuccessValidation = new Pair { First = true, Second = patientDto };

            if (string.IsNullOrWhiteSpace(patientDto.Address) || patientDto.Address.Length > RequestValidationConstant.MaximumAddressLength)
                return new Pair { First = false, Second = ApiRequestKeys.Address };

            if (string.IsNullOrWhiteSpace(patientDto.FirstName) || patientDto.FirstName.Length > RequestValidationConstant.MaximumNameLength)
                return new Pair { First = false, Second = ApiRequestKeys.FirstName };

            if (string.IsNullOrWhiteSpace(patientDto.MiddleName))
                returnSuccessValidation.Second.MiddleName = Strings.NoMiddleName;

            if (patientDto.MiddleName.Length > RequestValidationConstant.MaximumNameLength)
                return new Pair { First = false, Second = ApiRequestKeys.MiddleName };

            if (string.IsNullOrWhiteSpace(patientDto.LastName) || patientDto.LastName.Length > RequestValidationConstant.MaximumNameLength)
                return new Pair { First = false, Second = ApiRequestKeys.LastName };

            if (string.IsNullOrWhiteSpace(patientDto.Gender) || (patientDto.Gender != Strings.Male && patientDto.Gender != Strings.Female))
                return new Pair { First = false, Second = ApiRequestKeys.Gender };

            if (string.IsNullOrWhiteSpace(patientDto.PhoneNumber) || patientDto.PhoneNumber.Length != RequestValidationConstant.PhoneNumberLength)
                return new Pair { First = false, Second = ApiRequestKeys.PhoneNumber };

            if (string.IsNullOrWhiteSpace(patientDto.EmailId) || !Regex.IsMatch(patientDto.EmailId, Strings.RegexEmail, RegexOptions.IgnoreCase))
                return new Pair { First = false, Second = ApiRequestKeys.EmailId };

            return returnSuccessValidation;
        }

        /// <summary>
        /// Validates InsuranceDto sent in POST request
        /// </summary>
        /// <param name="insuranceDto">insuranceDto contains information of a new insurance to be added</param>
        /// <returns>Pair of {status:boolean,ApiKeyName/InsuranceDto} </returns>
        public static Pair ValidateInsuranceDto(InsuranceDto insuranceDto)
        {
            var returnSuccessValidation = new Pair { First = true, Second = insuranceDto };

            if (string.IsNullOrWhiteSpace(insuranceDto.Address) || insuranceDto.Address.Length > RequestValidationConstant.MaximumAddressLength)
                return new Pair { First = false, Second = ApiRequestKeys.Address };

            if (string.IsNullOrWhiteSpace(insuranceDto.Name) || insuranceDto.Name.Length > RequestValidationConstant.MaximumInsuranceNameLength)
                return new Pair { First = false, Second = ApiRequestKeys.Name };

            if (string.IsNullOrWhiteSpace(insuranceDto.PhoneNumber) || insuranceDto.PhoneNumber.Length != RequestValidationConstant.PhoneNumberLength)
                return new Pair { First = false, Second = ApiRequestKeys.PhoneNumber };

            if (string.IsNullOrWhiteSpace(insuranceDto.InsurancePublicId) || insuranceDto.InsurancePublicId.Length > RequestValidationConstant.InsurancePublicIdLength)
                return new Pair { First = false, Second = ApiRequestKeys.InsurancePublicId };

            return returnSuccessValidation;
        }

        /// <summary>
        /// Validates AddPatientInsurance sent in POST request
        /// </summary>
        /// <param name="patientInsuranceDto">patientInsuranceDto contains information of a new patient insurance to be added</param>
        /// <returns>Pair of {status:boolean,ApiKeyName/AddPatientInsurance} </returns>
        public static Pair ValidatePatientInsuranceDto(AddPatientInsurance patientInsuranceDto)
        {
            var returnSuccessValidation = new Pair { First = true, Second = patientInsuranceDto };

            if (patientInsuranceDto.InsuranceId < RequestValidationConstant.MinimumId)
                return new Pair { First = false, Second = ApiRequestKeys.InsuranceId };

            if (patientInsuranceDto.PatientId < RequestValidationConstant.MinimumId)
                return new Pair { First = false, Second = ApiRequestKeys.PatientId };

            if (string.IsNullOrWhiteSpace(patientInsuranceDto.InsurancePublicId) || patientInsuranceDto.InsurancePublicId.Length > RequestValidationConstant.InsurancePublicIdLength)
                return new Pair { First = false, Second = ApiRequestKeys.InsurancePublicId };

            return returnSuccessValidation;
        }

        /// <summary>
        /// Validates userDto sent in POST request
        /// </summary>
        /// <param name="userDto">userDto contains information of a new user to be added</param>
        /// <returns>Pair of {status:boolean,ApiKeyName/userDto} </returns>
        public static Pair ValidateUserDto(UserDto userDto)
        {
            var returnSuccessValidation = new Pair { First = true, Second = userDto };

            if (string.IsNullOrWhiteSpace(userDto.FirstName) || userDto.FirstName.Length > RequestValidationConstant.MaximumNameLength)
                return new Pair { First = false, Second = ApiRequestKeys.FirstName };

            if (string.IsNullOrWhiteSpace(userDto.MiddleName))
                returnSuccessValidation.Second.MiddleName = Strings.NoMiddleName;

            if (userDto.MiddleName.Length > RequestValidationConstant.MaximumNameLength)
                return new Pair { First = false, Second = ApiRequestKeys.MiddleName };

            if (string.IsNullOrWhiteSpace(userDto.LastName) || userDto.LastName.Length > RequestValidationConstant.MaximumNameLength)
                return new Pair { First = false, Second = ApiRequestKeys.LastName };

            if (string.IsNullOrWhiteSpace(userDto.Handle) || userDto.Handle.Length > RequestValidationConstant.MaximumNameLength)
                return new Pair { First = false, Second = ApiRequestKeys.UserId };

            if (string.IsNullOrWhiteSpace(userDto.Password) || userDto.Password.Length > RequestValidationConstant.MaximumNameLength)
                return new Pair { First = false, Second = ApiRequestKeys.Password };

            if (string.IsNullOrWhiteSpace(userDto.EmailId) || !Regex.IsMatch(userDto.EmailId, Strings.RegexEmail, RegexOptions.IgnoreCase))
                return new Pair { First = false, Second = ApiRequestKeys.EmailId };

            return returnSuccessValidation;
        }

        /// <summary>
        /// Method to validate verificationDto sent in POST request.
        /// </summary>
        /// <param name="verificationDto">verificationDto contains information related to verification procedure.</param>
        /// <returns>Pair of {status:boolean,ApiKeyName/verificationDto} </returns>
        public static Pair ValidateVerificationDto(VerificationDto verificationDto)
        {
            var returnSuccessValidation = new Pair { First = true, Second = verificationDto };

            if (string.IsNullOrWhiteSpace(verificationDto.VerificationCode) || !verificationDto.VerificationCode.Length.Equals(RequestValidationConstant.VerficationCodeLength))
                return new Pair { First = false, Second = ApiRequestKeys.VerificationCode };

            if (string.IsNullOrWhiteSpace(verificationDto.Handle))
                return new Pair { First = false, Second = ApiRequestKeys.Handle };

            if (string.IsNullOrWhiteSpace(verificationDto.Password))
                return new Pair { First = false, Second = ApiRequestKeys.Password };
            return returnSuccessValidation;
        }

        /// <summary>
        /// Method to validate forgot password dto sent in POST request.
        /// </summary>
        /// <param name="forgotPasswordDto">forgotpassword dto contains dtails required by system to generate a new forgot password request.</param>
        /// <returns>Pair of {status:boolean,ApiKeyName/forgotPasswordDto} </returns>
        public static Pair ValidateForgotPasswordDto(ForgotPasswordDto forgotPasswordDto)
        {
            var returnSuccessValidation = new Pair { First = true, Second = forgotPasswordDto };

            if (string.IsNullOrWhiteSpace(forgotPasswordDto.Handle))
                return new Pair { First = false, Second = ApiRequestKeys.Handle };
            return returnSuccessValidation;
        }

        /// <summary>
        /// Method to validate reset password dto sent in POST request.
        /// </summary>
        /// <param name="resetPasswordDto">resetPasswordDto dto contains dtails required by system to generate a new forgot password request.</param>
        /// <returns>Pair of {status:boolean,ApiKeyName/resetPasswordDto} </returns>
        public static Pair ValidateResetPasswordDto(ResetPasswordDto resetPasswordDto)
        {
            var returnSuccessValidation = new Pair { First = true, Second = resetPasswordDto };

            if (string.IsNullOrWhiteSpace(resetPasswordDto.Handle))
                return new Pair { First = false, Second = ApiRequestKeys.Handle };

            if (string.IsNullOrWhiteSpace(resetPasswordDto.VerificationCode))
                return new Pair { First = false, Second = ApiRequestKeys.VerificationCode };

            if (string.IsNullOrWhiteSpace(resetPasswordDto.Password))
                return new Pair { First = false, Second = ApiRequestKeys.Password };
            return returnSuccessValidation;
        }
    }
}
