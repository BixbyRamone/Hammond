using System;

namespace Hammond.API.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime? EventDate { get; set; }
        public User CreatedBy { get; set; }
    }
}