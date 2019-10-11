using System;
using Hammond.API.Models;

namespace Hammond.API.Dtos
{
    public class EventToReturnDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime EventDate { get; set; }
        public User CreatedBy { get; set; }
    }
}