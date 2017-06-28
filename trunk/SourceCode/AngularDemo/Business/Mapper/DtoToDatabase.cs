using Business.Constants;
using Business.Utilities;
using Data;
using DataTransferObject.Models;

namespace Business.Mapper
{
    /// <summary>
    /// /// <summary>
    /// Class to convert Dto's to Database objects
    /// Since project is covering small number of classes in database , DTO's are mapped manually.
    /// When number of classes increase we can use third party package such as AutoMapper.
    /// </summary>
    /// </summary>
    internal class DtoToDatabase
    {
        /// <summary>
        /// Maps a DataTransferObject.PatientDto to Data.Patient
        /// </summary>
        /// <param name="patient">patient containing information of a patient</param>
        /// <returns>Data.Patient having information mapped from DataTransferObject.PatientDto</returns>
        public static Patient Patient(PatientDto patient, int userId)
        {
            return new Patient
            {
                Address = patient.Address,
                Age = patient.Age,
                FirstName = patient.FirstName,
                Gender = patient.Gender,
                LastName = patient.LastName,
                MiddleName = patient.MiddleName,
                Phone = patient.PhoneNumber,
                CreationDate = Functions.GetCurrentDate(),
                CreationTime = Functions.GetCurrentTime(),
                Status = true,
                EmailId = patient.EmailId,
                UserId = userId
            };
        }

        /// <summary>
        /// Maps a DataTransferObject.InsuranceDto to Data.Insurance
        /// </summary>
        /// <param name="insurance">insurance containing information of a insurance</param>
        /// <returns>Data.Insurance having information mapped from DataTransferObject.InsuranceDto</returns>
        public static Insurance Insurance(InsuranceDto insurance, int userId)
        {
            return new Insurance
            {
                Address = insurance.Address,
                Name = insurance.Name,
                Phone = insurance.PhoneNumber,
                PublicId = insurance.InsurancePublicId,
                CreationDate = Functions.GetCurrentDate(),
                CreationTime = Functions.GetCurrentTime(),
                UserId = userId,
                Status = true
            };
        }

        /// <summary>
        /// Maps a DataTransferObject.UserDto to Data.User
        /// </summary>
        /// <param name="user">user containing information of a user</param>
        /// <returns>Data.User having information mapped from DataTransferObject.UserDto</returns>
        public static User User(UserDto user)
        {
            return new User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                MiddleName = user.MiddleName,
                CreationDate = Functions.GetCurrentDate(),
                CreationTime = Functions.GetCurrentTime(),
                EmailId = user.EmailId,
                Handle = user.Handle,
                Status = true,
                IsVerified = false,
                VerificationCode = Functions.GenerateCode().ToString(),
                ForgotPasswordCode = Strings.Empty,
                ForgotPasswordFlag = false
            };
        }

        /// <summary>
        /// Maps a Pair of {DataTransferObject.PatientDto,userId} to Data.PatientInsurance
        /// userId is the id of the user fetched from api using its Utilities.UserIdentity.GetUserId() method
        /// </summary>
        /// <param name="patientInsurance">patientInsurance containing information of a patientInsurance</param>
        /// <returns>Data.PatientInsurance having information mapped from Pair of {DataTransferObject.PatientDto,userId}</returns>
        public static PatientInsurance PatientInsurance(Pair patientInsurance)
        {
            //patientInsurance Pair's First value contains PatientDto and Second value contains userId who is adding the patient insurance
            var addPatientInsurance = patientInsurance.First;
            var userId = patientInsurance.Second;
            return new PatientInsurance
            {
                InsuranceId = addPatientInsurance.InsuranceId,
                PatientId = addPatientInsurance.PatientId,
                UserId = userId,
                CreationDate = Functions.GetCurrentDate(),
                CreationTime = Functions.GetCurrentTime(),
                Status = true
            };
        }

        /// <summary>
        /// Maps a DataTransferObject.LoginDto to Data.UserPassword.
        /// Uses userId as foreign key for Data.User table.
        /// </summary>
        /// <param name="loginDto">loginDto contains public userId and userPassword of new user.</param>
        /// <param name="userId">userId of user from Data.User table</param>
        /// <returns>Data.UserPassword having information mapped from DataTransferObject.LoginDto</returns>
        public static UserPassword UserPassword(LoginDto loginDto, int userId)
        {
            return new UserPassword
            {
                Password = loginDto.LoginPassword,
                UserId = userId,
                CreationDate = Functions.GetCurrentDate(),
                CreationTime = Functions.GetCurrentTime(),
                Status = true
            };
        }

        /// <summary>
        /// Converts a emailServiceDto to Data.EmailLog in order to save email log to database
        /// </summary>
        /// <param name="emailServiceDto">emailServiceDto contains the information related to email which is being saved.</param>
        /// <param name="sentStatus">sentStatus is the status of email. It is true is its sent otherwise false.</param>
        /// <returns>Data.EmailLog having information mapped from DatTransferObject.EmailServiceDto</returns>
        public static EmailLog EmailLog(EmailServiceDto emailServiceDto, bool sentStatus)
        {
            return new EmailLog
            {
                Body = emailServiceDto.Body,
                CreationDate = Functions.GetCurrentDate(),
                CreationTime = Functions.GetCurrentTime(),
                MailFrom = emailServiceDto.EmailFrom,
                MailTo = emailServiceDto.ListToEmailString(),
                SendStatus = sentStatus,
                Status = true,
                Subject = emailServiceDto.Subject
            };
        }
    }
}
