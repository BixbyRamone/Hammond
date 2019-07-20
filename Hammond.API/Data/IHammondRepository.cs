using System.Collections.Generic;
using System.Threading.Tasks;
using Hammond.API.Helpers;
using Hammond.API.Models;

namespace Hammond.API.Data
{
    public interface IHammondRepository
    {
         void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetStudents(string studentLevel);
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);
        Task<Message> GetMessage(int id);
        Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
        Task<Assignment> GetAssignment(int id);
        Task<PagedList<Assignment>> GetAssignments(AssignmentParams assignmentParams);
        Task<Assignment> GetUserAssignment(int id);
        Task<PagedList<Assignment>> GetUserAssignments(AssignmentParams assignmentParams);
        void SqlCmdHelper(string sqlCmnd);
        
    }
}