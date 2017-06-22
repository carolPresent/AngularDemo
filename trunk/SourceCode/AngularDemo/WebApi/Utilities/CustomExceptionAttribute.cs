using Business.Constants;
using DataTransferObject.Models;
using Elmah;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Filters;
using WebApi.Constants;

namespace WebApi.Utilities
{
    /// <summary>
    /// Custom Exception Attribute to handle and log exceptions 
    /// </summary>
    public class CustomExceptionAttribute : ExceptionFilterAttribute
    {
        /// <summary>
        /// method to be invoked on occurrence of exception
        /// this method logs excpetion in database
        /// </summary>
        /// <param name="actionExecutedContext"></param>
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            //log exception
            ErrorSignal.FromCurrentContext().Raise(actionExecutedContext.Exception);

            //return internal server error as response
            actionExecutedContext.Response = actionExecutedContext.Request.CreateResponse(HttpStatusCode.InternalServerError, new ResponseModel()
            {
                Message=Strings.InternalServerError,
                Status=StatusStrings.Failed,
                StatusCode= StatusCodes.InternalServerError
            });
        }
    }
}