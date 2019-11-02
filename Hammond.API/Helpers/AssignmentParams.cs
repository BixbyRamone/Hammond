using Hammond.API.Models;

namespace Hammond.API.Helpers
{
    public class AssignmentParams
    {
        
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value;}
        }

        public int UserId { get; set; }
        public Role Role { get; set; }
        public string AssigmentContainer { get; set; } = "Incomplete";
        public string OrderBy { get; set; }
        public string StudentLevel { get; set; }
    }
}