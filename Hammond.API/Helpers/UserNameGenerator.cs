using System.Collections.Generic;

namespace Hammond.API.Helpers
{
    public class UserNameGenerator
    {
        public static string ReturnUserName(string firstName, string lastname, List<string> userNames )
        {
            int iterator = 1;
            string userName = firstName[0] + lastname;
            while (userNames.Contains(userName))
                    {
                        userName =  firstName[0] + lastname + iterator.ToString();
                        iterator++;
                    }
                    
           return userName;
        }

        public static string ReturnPassword(string address, string cityName)
        {
            string[] aa = address.Split(" ");
            string pass = aa[0] + cityName;
            if (pass.Length > 15)
            {
                pass.Remove(15);
            }
            return pass;
        }

    }
}