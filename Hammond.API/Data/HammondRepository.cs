using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Hammond.API.Helpers;
using Hammond.API.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace Hammond.API.Data
{
    public class HammondRepository : IHammondRepository
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;

        public HammondRepository(
            DataContext context,
            UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Assignment> GetAssignment(int id)
        {
            var assignment = await _context.Assignments.FirstOrDefaultAsync(a => a.Id == id);

            return assignment;
        }

        public async Task<PagedList<Assignment>> GetAssignments(AssignmentParams assignmentParams)
        {
            var assignments = _context.Assignments.AsQueryable();

            if (assignmentParams.StudentLevel != null && assignmentParams.StudentLevel != "all")
            {
                assignments = assignments.Where(a => a.StudentLevel == assignmentParams.StudentLevel);
            }

            assignments = assignments.OrderByDescending(a => a.DateAssigned);
            return await PagedList<Assignment>.CreateAsync(assignments, assignmentParams.PageNumber,
                assignmentParams.PageSize);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams)
        {
            var messages = _context.Messages
                .Include(u => u.Sender)
                .Include(u => u.Recipient)
                .AsQueryable();

            switch (messageParams.MessageContainer)
            {
                case "Inbox":
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId
                        && u.RecipientDeleted == false);
                    break;
                case "Outbox":
                    messages = messages.Where(u => u.SenderId == messageParams.UserId
                       && u.SenderDeleted == false);
                    break;
                default:
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId
                        && u.RecipientDeleted == false && u.IsRead == false);
                    break;
            }

            messages = messages.OrderByDescending(d => d.DateSent);
            return await PagedList<Message>.CreateAsync(messages, messageParams.PageNumber,
                messageParams.PageSize);
        }

        public Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<Assignment> GetUserAssignment(int id)
        {
            var assignment = await _context.Assignments
                            .Include(x => x.UserAssignments)
                            .FirstOrDefaultAsync(a => a.Id == id);

            return assignment;
        }

        public async Task<PagedList<Assignment>> GetUserAssignments(AssignmentParams assignmentParams)
        {
            var assignments = _context.Assignments
                                .Include(x => x.UserAssignments)
                                .AsQueryable();

            // assignments = assignments.Where(x => x.Id == )

            return await PagedList<Assignment>.CreateAsync(assignments, assignmentParams.PageNumber,
                assignmentParams.PageSize);
            throw new System.NotImplementedException();
        }
        

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.Include(u => u.UserGroups)
            .Include(u => u.UserRoles)
            .ThenInclude(ur => ur.Role)
            .OrderBy(u => u.LastName).AsQueryable();
           

            if (userParams.RoleName == "volunteer")
            {
                var tutors = _userManager.GetUsersInRoleAsync("tutor").Result;
                var mentors = _userManager.GetUsersInRoleAsync("mentor").Result;
                var usersWithRole = mentors.Union(tutors);
                    users = users.Where(u => usersWithRole.Contains(u));
            }
            if (userParams.RoleName == "student") 
            {
                var usersWithRole = _userManager.GetUsersInRoleAsync(userParams.RoleName).Result;
                    users = users.Where(u => usersWithRole.Contains(u));
            }            

            if (userParams.StudentLevel != null && userParams.StudentLevel != "all")
            {
                users = users.Where(u => u.StudentLevel == userParams.StudentLevel);
                // var usersWithRole = _userManager.GetUsersInRoleAsync(userParams.RoleName).Result;

                // users = users.Where(u => usersWithRole.Contains(u));
            }

            if (userParams.GetUngrouped)
            {
                users = users.Where(u => u.UserGroups.Count == 0);
            }

            

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.DateCreated);
                        break;

                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<IEnumerable<User>> GetStudents(string studentLevel)
        {
            var users = await _context.Users.Where(u => u.StudentLevel == studentLevel)
            .Include(a => a.UserAssignments).ToListAsync();

            return users;
        }

        public async Task<PagedList<Group>> GetGroups(UserParams userParams)
        {
            var groups = _context.Group.Include(g => g.UserGroups)
            .ThenInclude(ug => ug.User)
            .AsQueryable();

            // if (userParams.StudentLevel != null && userParams.StudentLevel != "null")
            // {
            //     groups = groups.Where(u => u.StudentLevel == userParams.StudentLevel);
            //     var test = _userManager.GetUsersInRoleAsync("Student").Result;

            //     users = users.Where(u => test.Contains(u));
            // }

            
            // if (!string.IsNullOrEmpty(userParams.OrderBy))
            // {
            //     switch (userParams.OrderBy)
            //     {
            //         case "created":
            //             users = users.OrderByDescending(u => u.DateCreated);
            //             break;

            //         default:
            //             users = users.OrderByDescending(u => u.LastActive);
            //             break;
            //     }
            // }

            return await PagedList<Group>.CreateAsync(groups, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<Group> GetGroup(int id)
        {
            var group = await _context.Group.Include(g => g.UserGroups)
            .ThenInclude(ug => ug.User)
            .FirstOrDefaultAsync(g => g.Id == id);

            return group;
        }

        public async Task<PagedList<Event>> GetEvents(UserParams userParams)
        {
         var evnts = _context.Events.AsQueryable();

         return await PagedList<Event>.CreateAsync(evnts, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<Event> GetEvent(int id)
        {
            var evnt = await _context.Events.FirstOrDefaultAsync(e => e.Id == id);

            return evnt;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void SqlCmdHelper(string sqlCmnd)
        {
            _context.Database.ExecuteSqlCommand(sqlCmnd);
        }
        
    }
}