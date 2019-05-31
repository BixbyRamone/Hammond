using System;

namespace Hammond.API.Models
{
    public class ActScore
    {
public int Id { get; set; }
        public int Score { get; set; }
        public DateTime DayOfScore { get; set; }
        public User Student { get; set; }
    }
}