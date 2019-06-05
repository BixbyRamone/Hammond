using System;
using System.Collections.Generic;
using Hammond.API.Models;

namespace Hammond.API.Dtos
{
    public class UserForDetailedDto
    {
         public string FirstName { get; set; }
        public string LastName { get; set; }
        public string StudentLevel { get; set; }
        public DateTime LastActive { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
}