using System.Collections.Generic;

namespace Hammond.API.Dtos
{
    public class GroupForCreationDto
    {
        public List<int> VolunteerIds { get; set; }
        public List<int> StudentIds { get; set; }
    }
}