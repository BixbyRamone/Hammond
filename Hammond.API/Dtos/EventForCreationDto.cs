using System;

namespace Hammond.API.Dtos
{
    public class EventForCreationDto
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime EventDate { get; set; }

    }
}