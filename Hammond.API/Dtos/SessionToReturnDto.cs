using System;
using System.Collections.Generic;
using Hammond.API.Models;

namespace Hammond.API.Dtos
{
    public class SessionToReturnDto
    {
        public string Description { get; set; }
        public DateTime DayOfSession { get; set; }
        public ICollection<SessionAssignment> SessionAssignments { get; set; }
    }
}