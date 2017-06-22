using System.Collections.Generic;

namespace Business.Utilities
{
    /// <summary>
    /// Class to create list for Data field in ResponseModel
    /// </summary>
    internal class DynamicListForResponse
    {
        /// <summary>
        /// Method to create list dynamic object. Attach this list to ResponseModel's Data parameter
        /// </summary>
        /// <param name="obj">obj is the dynamis type for creating list</param>
        /// <returns>List of dynamic objects</returns>
        public static List<dynamic> Create(dynamic obj)
        {
            var returnItem = new List<dynamic>();
            returnItem.Add(obj);
            return returnItem;
        }
    }
}
