﻿using Business.Constants;
using DataTransferObject.Models;
using Newtonsoft.Json;
using System.Collections.Generic;

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
        /// <param name="data">dynamic data type for sending in Data field of response model</param>
        /// <returns>ResponseModel of a success respponse</returns>
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
        /// Success response when data has to be string type
        /// </summary>
        /// <param name="data">data is the message to be sent</param>
        /// <returns>ResponseModel of a success respponse</returns>
        public static ResponseModel SuccessResponse(string data)
        {
            return new ResponseModel
            {
                Count = Integers.NoReturnCount,
                Data = data,
                Message = StatusMessages.CreatedSuccessfully,
                Status = StatusStrings.Success,
                StatusCode = StatusCodes.Success
            };
        }

        /// <summary>
        /// Method for returning failed response.
        /// </summary>
        /// <param name="data">dynamic data to send in failed response</param>
        /// <returns>ResponseModel of a failed response</returns>
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

        /// <summary>
        /// Method for returning failed response.
        /// </summary>
        /// <param name="data">dynamic data to send a failed response</param>
        /// <returns>ResponseModel of a failed response</returns>
        public static ResponseModel FailedResponse(dynamic data)
        {
            return new ResponseModel
            {
                Count = Integers.NoReturnCount,
                Data = data,
                Message = StatusMessages.UnsuccessfulAddition,
                Status = StatusStrings.Failed,
                StatusCode = StatusCodes.InternalServerError
            };
        }
        /// <summary>
        /// Method for returning bad request type of response
        /// </summary>
        /// <param name="data">dynamic data to add in the Data field</param>
        /// <returns>ResponseModel of bad request</returns>
        internal static ResponseModel BadRequestResponse(dynamic data)
        {
            return new ResponseModel
            {
                Count = Integers.NoReturnCount,    //count is zero for bad request response
                Data = data,
                Message = StatusMessages.InvalidParameter,
                Status = StatusStrings.Failed,
                StatusCode = StatusCodes.BadRequest
            };
        }

        /// <summary>
        /// Method for returning failed login in case when user handle is not found.
        /// </summary>
        /// <returns>ResponseModel for failed login</returns>
        internal static ResponseModel FailedLogin(string message, int statusCode)
        {
            return new ResponseModel
            {
                Count = Integers.NoReturnCount,
                Message = message,
                Status = StatusStrings.Failed,
                StatusCode = statusCode
            };
        }

        /// <summary>
        /// Method for returning success login.
        /// </summary>
        /// <param name="data">dynamic data to send in successful login</param>
        /// <returns>ResponseModel for successful login</returns>
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
