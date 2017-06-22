namespace DataTransferObject.Models
{
    public class ResponseModel
    {
        public int StatusCode { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
        public int Count { get; set; }
        public dynamic Data { get; set; }
    }
}
