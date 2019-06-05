using System;
using System.Collections.Generic;
using Hammond.API.Models;

namespace Hammond.API.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string StudentLevel { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
}