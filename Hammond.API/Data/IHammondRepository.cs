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
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);
    }
}