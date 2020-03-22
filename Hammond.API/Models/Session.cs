using System;

namespace Hammond.API.Models
{
    public class Session
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime DayOfSession { get; set; }
        public Assignment[] Assignments { get; set; }
    }
}