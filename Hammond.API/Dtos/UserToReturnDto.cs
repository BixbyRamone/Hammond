using System;
using System.Collections.Generic;
using Hammond.API.Models;

namespace Hammond.API.Dtos
{
    public class UserToReturnDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string StudentLevel { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public ICollection<UserGroup> UserGroups { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<UserAssignment> UserAssignments { get; set; }
        public ICollection<Assignment> Assignments { get; set; }
    }
}