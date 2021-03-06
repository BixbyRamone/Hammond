using Hammond.API.Models;

namespace Hammond.API.Helpers
{
    public class UserParams
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
        public string OrderBy { get; set; }
        public string StudentLevel { get; set; }
        public string RoleName { get; set; }
        public bool GetUngrouped { get; set; }
        public int GroupId { get; set; }
        public bool OlderSessionsDelete { get; set; }
        public bool GetNextSession { get; set; }
    }
}