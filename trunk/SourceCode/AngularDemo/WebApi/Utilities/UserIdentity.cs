using System;
using System.Linq;
using System.Security.Claims;
using WebApi.Constants;

namespace WebApi.Utilities
{
    internal class UserIdentity
    {
        public static int GetUserId(ClaimsIdentity identity)
        {
            var claims = identity.Claims.ToDictionary(m => m.Type, m => m.Value);
            return Convert.ToInt32(claims[Strings.UserId]);
        }
    }
}