using Business.Constants;
using DataTransferObject.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System;

namespace Business.Utilities
{
    /// <summary>
    /// Contains different type of response models to return.
    /// </summary>
    internal class ReturnStatements
    {
        /// <summary>
        /// Method for returning success response.
        /// </summary>
        /// <param name="data"></param>
        /// <returns>ResponseModel</returns>
        public static ResponseModel SuccessResponse(dynamic data)
        {
            return new ResponseModel
            {
                Count = data.Count,
                Data = JsonConvert.SerializeObject(data),
                Message = StatusMessages.CreatedSuccessfully,
                Status = StatusStrings.Success,
                StatusCode = StatusCodes.Success
            };
        }

        /// <summary>
        /// Method for returning success response.
        /// </summary>
        /// <param name="data"></param>
        /// <returns>ResponseModel</returns>
        public static ResponseModel FailedResponse(List<dynamic> data)
        {
            return new ResponseModel
            {
                Count = data.Count,
                Data = JsonConvert.SerializeObject(data),
                Message = StatusMessages.UnsuccessfulAddition,
                Status = StatusStrings.Failed,
                StatusCode = StatusCodes.InternalServerError
            };
        }

        internal static ResponseModel BadRequestResponse(dynamic data)
        {
            return new ResponseModel
            {
                Count = 0,    //count is zero for bad request response
                Data = data,
                Message = StatusMessages.InvalidParameter,
                Status = StatusStrings.Failed,
                StatusCode = StatusCodes.BadRequest
            };
        }

        /// <summary>
        /// Method for returning failed login.
        /// </summary>
        /// <returns></returns>
        internal static ResponseModel FailedLogin()
        {
            return new ResponseModel
            {
                Count = Integers.NoReturnCount,
                Message = StatusMessages.LoginFailed,
                Status = StatusStrings.Failed,
                StatusCode = StatusCodes.Unauthorized
            };
        }

        /// <summary>
        /// Method for returning success login.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        internal static ResponseModel SuccessLogin(dynamic data)
        {
            return new ResponseModel
            {
                Count = Integers.NoReturnCount,
                Message = StatusMessages.LoginSuccessfull,
                Status = StatusStrings.Success,
                StatusCode = StatusCodes.Success,
                Data = data
            };
        }
    }
}
