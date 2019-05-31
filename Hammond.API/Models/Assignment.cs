using System;

namespace Hammond.API.Models
{
    public class Assignment
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Contnet { get; set; }
        public string StudentLevel { get; set; }
        public string Section { get; set; } // i.e. Tutoring or Mentoring
        public DateTime DateAssigned { get; set; }
        public DateTime DateDue { get; set; }
        public bool Assigned { get; set; }
        public bool Completed { get; set; }
        public User CreatedBy { get; set; }
    }
}