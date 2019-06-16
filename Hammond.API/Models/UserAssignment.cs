namespace Hammond.API.Models
{
    public class UserAssignment
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int AssignmentId { get; set; }
        public Assignment Assignment { get; set; }
        public bool Completed { get; set; }        
    }
}