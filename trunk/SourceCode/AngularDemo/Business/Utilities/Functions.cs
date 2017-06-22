using System;

namespace Business.Utilities
{
    /// <summary>
    /// Functions used in business logic
    /// </summary>
    internal class Functions
    {
        /// <summary>
        /// Common method to get date
        /// </summary>
        /// <returns></returns>
        public static string GetCurrentDate()
        {
            return DateTime.Now.ToLongDateString();
        }

        /// <summary>
        /// Common method to get time
        /// </summary>
        /// <returns></returns>
        public static string GetCurrentTime()
        {
            return DateTime.Now.ToLongTimeString();
        }
    }
}
