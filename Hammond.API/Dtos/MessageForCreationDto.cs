using System;

namespace Hammond.API.Dtos
{
    public class MessageForCreationDto
    {
        public int SenderId { get; set; }
        public int RecipientId { get; set; }
        public DateTime DateSent { get; set; }
        public string Content { get; set; }
        public int AssignmentId { get; set; }
        public int GroupId { get; set; }
        public MessageForCreationDto()
        {
            DateSent = DateTime.Now;
        }
    }
}