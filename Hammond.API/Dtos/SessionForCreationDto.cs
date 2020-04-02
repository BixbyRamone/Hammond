using System;
using System.Collections.Generic;
using Hammond.API.Models;

namespace Hammond.API.Dtos
{
    public class SessionForCreationDto
    {
        public string Description { get; set; }
        public DateTime? DayOfSession { get; set; }
        public string StudentLevel { get; set; }
        public ICollection<Assignment> Assignments { get; set; }
    }
}