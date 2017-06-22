using Business.Constants;
using DataTransferObject.Models;
using DataTransferObject.QueryModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Utilities
{
    /// <summary>
    /// Internal class for validating request model manually. Data annotations can be used also.
    /// All methods return a Pair, where First contains boolean value of validation status and Second contains Api key name where error occured.
    /// </summary>
    internal class ValidateRequest
    {
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

            return returnSuccessValidation;
        }

        public static Pair ValidateInsuranceDto(InsuranceDto insuranceDto)
        {
            var returnSuccessValidation = new Pair { First = true, Second = insuranceDto };

            if (string.IsNullOrWhiteSpace(insuranceDto.Address) || insuranceDto.Address.Length > RequestValidationConstant.MaximumAddressLength)
                return new Pair { First = false, Second = ApiRequestKeys.Address };

            if (string.IsNullOrWhiteSpace(insuranceDto.Name) || insuranceDto.Name.Length > RequestValidationConstant.MaximumInsuranceNameLength)
                return new Pair { First = false, Second = ApiRequestKeys.Name };

            if (string.IsNullOrWhiteSpace(insuranceDto.PhoneNumber) || insuranceDto.PhoneNumber.Length != RequestValidationConstant.PhoneNumberLength)
                return new Pair { First = false, Second = ApiRequestKeys.PhoneNumber };

            if (string.IsNullOrWhiteSpace(insuranceDto.InsurancePublicId) || insuranceDto.InsurancePublicId.Length != RequestValidationConstant.InsurancePublicIdLength)
                return new Pair { First = false, Second = ApiRequestKeys.InsurancePublicId };

            return returnSuccessValidation;
        }

        public static Pair ValidatePatientInsuranceDto(AddPatientInsurance patientInsuranceDto)
        {
            var returnSuccessValidation = new Pair { First = true, Second = patientInsuranceDto };

            if (patientInsuranceDto.InsuranceId < RequestValidationConstant.MinimumId)
                return new Pair { First = false, Second = ApiRequestKeys.InsuranceId };

            if (patientInsuranceDto.PatientId < RequestValidationConstant.MinimumId)
                return new Pair { First = false, Second = ApiRequestKeys.PatientId };

            if (string.IsNullOrWhiteSpace(patientInsuranceDto.InsurancePublicId) || patientInsuranceDto.InsurancePublicId.Length != RequestValidationConstant.InsurancePublicIdLength)
                return new Pair { First = false, Second = ApiRequestKeys.InsurancePublicId };

            return returnSuccessValidation;
        }

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

            if (string.IsNullOrWhiteSpace(userDto.UserId) || userDto.UserId.Length > RequestValidationConstant.MaximumNameLength)
                return new Pair { First = false, Second = ApiRequestKeys.UserId };

            if (string.IsNullOrWhiteSpace(userDto.UserPassword) || userDto.UserPassword.Length > RequestValidationConstant.MaximumNameLength)
                return new Pair { First = false, Second = ApiRequestKeys.UserPassword };

            return returnSuccessValidation;
        }
    }
}
