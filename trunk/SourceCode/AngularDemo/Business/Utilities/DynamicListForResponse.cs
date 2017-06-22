﻿using System.Collections.Generic;

namespace Business.Utilities
{
    internal class DynamicListForResponse
    {
        /// <summary>
        /// Method to create list dynamic object. Attach this list to ResponseModel's Data parameter
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static List<dynamic> Create(dynamic obj)
        {
            var returnItem = new List<dynamic>();
            returnItem.Add(obj);
            return returnItem;
        }
    }
}