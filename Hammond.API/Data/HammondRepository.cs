using System.Linq;
using System.Threading.Tasks;
using Hammond.API.Helpers;
using Hammond.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Hammond.API.Data
{
    public class HammondRepository : IHammondRepository
    {
        private readonly DataContext _context;
        public HammondRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync();

            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.OrderBy(u => u.LastName).AsQueryable();

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

        public Task<bool> SaveAll()
        {
            throw new System.NotImplementedException();
        }
    }
}