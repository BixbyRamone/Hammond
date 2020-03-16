using System.Collections.Generic;
using Hammond.API.Models;

namespace Hammond.API.Dtos
{
    public class UserForUpdateDto
    {
        public int id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string StudentLevel { get; set; }
        public ICollection<ActScore> ActScores { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
}