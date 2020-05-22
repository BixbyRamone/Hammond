using System;
using Hammond.API.Models;

namespace Hammond.API.Dtos
{
    public class AssignmentMessageForCreationDto
    {
         public string Content { get; set; }
        public int SenderId { get; set; }
        public User Sender { get; set; }
        public int[] RecipientIds { get; set; }
        public DateTime DateSent { get; set; }
        public int AssignmentId { get; set; }
        public int GroupId { get; set; }
        public AssignmentMessageForCreationDto()
        {
            DateSent = DateTime.Now;
        }
    }
}