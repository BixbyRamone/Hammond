using System;

namespace Hammond.API.Dtos
{
    public class EventForUpdateDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime? EventDate { get; set; }
    }
}