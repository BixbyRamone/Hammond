using System;
using System.Collections.Generic;

namespace Hammond.API.Models
{
    public class Session
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime? DayOfSession { get; set; }
        public string StudentLevel { get; set; }
        public ICollection<SessionAssignment> SessionAssignments { get; set; }
    }
}