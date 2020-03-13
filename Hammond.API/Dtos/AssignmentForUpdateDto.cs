using System;

namespace Hammond.API.Dtos
{
    public class AssignmentForUpdateDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string StudentLevel { get; set; }
        public string Section { get; set; } // i.e. Tutoring or Mentoring
        public DateTime DateDue { get; set; }
        public bool Assigned { get; set; }
    }
}