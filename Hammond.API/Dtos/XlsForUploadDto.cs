using Microsoft.AspNetCore.Http;

namespace Hammond.API.Dtos
{
    public class XlsForUploadDto
    {
        public IFormFile File { get; set; }
        public string UserRole { get; set; }
    }
}