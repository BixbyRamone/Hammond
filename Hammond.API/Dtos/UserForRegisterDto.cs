using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Hammond.API.Models;

namespace Hammond.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        [StringLength(15, MinimumLength = 2, ErrorMessage = "Username must be between 2 and 15 characters.")]
        public string Username { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 4, ErrorMessage = "Password must be between 4 and 15 characters")]
        public string Password { get; set; }
        
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }
        
        public DateTime DateCreated { get; set; }
        public DateTime LastActive { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }

        public UserForRegisterDto()
        {
            DateCreated = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}