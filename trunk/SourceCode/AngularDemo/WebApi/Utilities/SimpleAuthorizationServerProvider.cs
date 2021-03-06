﻿using Business.Constants;
using Business.Services;
using DataTransferObject.Models;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebApi.Utilities
{
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        /// <inheritdoc />
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        /// <inheritdoc />
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add(Constants.Strings.AllowOrigin, new[] { Constants.Strings.All });
            var services = new UserService();
            var userQuery = services.Login(new LoginDto(context.UserName, context.Password));
            if (userQuery.StatusCode.Equals(StatusCodes.Unauthorized))
            {
                context.SetError(Constants.Strings.InvalidGrant, userQuery.Message);
                return;
            }
            var userId = Convert.ToInt32(userQuery.Data);
            //Add Claims identity after validation
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim(Constants.Strings.UserId, userId.ToString()));
            context.Validated(identity);
        }
    }
}