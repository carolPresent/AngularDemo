using DataTransferObject.Constants;
using DataTransferObject.Interfaces;

namespace DataTransferObject.QueryModels
{
    public class UserQuery : QueryInterface
    {
        public string Name { get; set; }
        public string UserId { get; set; }

        public UserQuery(string name = CommonString.OptionalStringParam, string userId = CommonString.OptionalStringParam)
        {
            Name = name;
            UserId = userId;
        }

        public void SetTypedVariables() { }
    }
}
