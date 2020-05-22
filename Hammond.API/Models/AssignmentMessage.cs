using System;

namespace Hammond.API.Models
{
    public class AssignmentMessage
    {
        
        public int Id { get; set; }
        public string Content { get; set; }
        public int SenderId { get; set; }
        public User Sender { get; set; }
        public int[] RecipientIds { get; set; }
        public DateTime DateSent { get; set; }
        public DateTime? DateRead { get; set; }
        public int AssignmentId { get; set; }
        public int GroupId { get; set; }
    }
}