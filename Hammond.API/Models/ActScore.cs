    using System;

namespace Hammond.API.Models
{
    public class ActScore
    {
        public int Id { get; set; }
        public int Score { get; set; }
        public int? EnglishScore { get; set; }
        public int? MathmaticsScore { get; set; }
        public int? ReadingScore { get; set; }
        public int? ScienceScore { get; set; }
        public int? WritingScore { get; set; }
        public DateTime DayOfScore { get; set; }
        public User Student { get; set; }
    }
}