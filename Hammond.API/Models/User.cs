using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Hammond.API.Models
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string StudentLevel { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime LastActive { get; set; }
        public ICollection<ActScore> ActScores { get; set; }
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
        
    }
}