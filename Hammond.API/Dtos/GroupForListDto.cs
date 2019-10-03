using System.Collections.Generic;
using Hammond.API.Models;

namespace Hammond.API.Dtos
{
    public class GroupForListDto
    {
        public int Id { get; set; }
        public ICollection<UserGroup> UserGroups { get; set; }
    }
}