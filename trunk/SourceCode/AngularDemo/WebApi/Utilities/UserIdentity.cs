using System;
using System.Linq;
using System.Security.Claims;
using WebApi.Constants;

namespace WebApi.Utilities
{
    /// <summary>
    /// Helper class to get claims of authorized token.
    /// </summary>
    internal class UserIdentity
    {
        /// <summary>
        /// Method returns user id associated to the authtoken.
        /// </summary>
        /// <param name="identity"></param>
        /// <returns></returns>
        public static int GetUserId(ClaimsIdentity identity)
        {
            var claims = identity.Claims.ToDictionary(m => m.Type, m => m.Value);
            return Convert.ToInt32(claims[Strings.UserId]);
        }
    }
}