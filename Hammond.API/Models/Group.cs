using System.Collections.Generic;

namespace Hammond.API.Models
{
    public class Group
    {
        public int Id { get; set; }
        public ICollection<UserGroup> UserGroups { get; set; }
    }
}