using System.Collections.Generic;
using Hammond.API.Models;

namespace Hammond.API.Helpers
{
    public class UserNameGenerator
    {
        public static string ReturnUserName(string firstName, string lastname, List<User> userFromDb, List<string> unList)
        {
            int iterator = 1;
            string userName = firstName[0] + lastname;
            List<string> userNames = new List<string>();
            foreach (var item in userFromDb)
            {
                userNames.Add(item.UserName);
            }

            while (userNames.Contains(userName) || unList.Contains(userName)) // checks previous and current userNames
                    {
                        userName =  firstName[0] + lastname + iterator.ToString();
                        iterator++;
                    }
                    
           return userName;
        }

        public static string ReturnPassword(string address, string cityName)
        {
            if (cityName == "")
                cityName = "Cleveland";
                
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