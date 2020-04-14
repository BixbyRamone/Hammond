using System;
using System.Collections.Generic;

namespace Hammond.API.Helpers
{
    public class StudLevCalc
    {
        public static string ReturnStudLev(List<string> cohortList, int index)
        {
            var currentYear = DateTime.Now.Year;
            int cohortYear = Int32.Parse(cohortList[index]);
            switch (cohortYear - currentYear)
            {
                case 0:
                    return "senior";
                case 1:
                    return "junior";
                case 2:
                    return "sophomore";
            }
            return "";
        }
    }
}