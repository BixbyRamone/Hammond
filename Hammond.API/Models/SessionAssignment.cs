namespace Hammond.API.Models
{
    public class SessionAssignment
    {
        public int Id { get; set; }
        public Session Session { get; set; }
        public int SessionId { get; set; }
        public Assignment Assigment { get; set; }
        public int AssignmentId { get; set; }
    }
}