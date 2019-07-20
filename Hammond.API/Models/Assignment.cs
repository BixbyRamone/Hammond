using System;
using System.Collections.Generic;

namespace Hammond.API.Models
{
    public class Assignment
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string StudentLevel { get; set; }
        public string Section { get; set; } // i.e. Tutoring or Mentoring
        public DateTime? DateAssigned { get; set; }
        public DateTime DateDue { get; set; }
        public bool Assigned { get; set; }
        public User CreatedBy { get; set; }
        public ICollection<UserAssignment> UserAssignments { get; set; }

        // public void Register(IEnumerable<User> students)
        // {
        //     foreach(var student in students)
        //     {
        //         this.Register(student);
        //     }
        // }

        // public void Register(User student)
        // {
        //     var ua = new UserAssignment(student, this);
        // }
    }
}