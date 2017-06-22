namespace DataTransferObject.Models
{
    /// <summary>
    /// Common response model used through out the service.
    /// </summary>
    public class ResponseModel
    {
        public int StatusCode { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
        public int Count { get; set; }
        public dynamic Data { get; set; }
    }
}
