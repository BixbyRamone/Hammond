using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Hammond.API.Data;
using Hammond.API.Dtos;
using Hammond.API.Helpers;
using Hammond.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Hammond.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IHammondRepository _repo;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        public UsersController(
            IHammondRepository repo,
            IMapper mapper,
            UserManager<User> userManager,
            RoleManager<Role> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public  async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var usersFromRepo = await _repo.GetUser(currentUserId);

            userParams.UserId = currentUserId;

            var users = await _repo.GetUsers(userParams);

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            Response.AddPagination(users.CurrentPage,  users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}",  Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok(userToReturn);
        }

        [HttpDelete("{id}/authId/{userId}")]
        public async Task<IActionResult> DeleteUser(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repo.GetUser(id);

            _repo.Delete(user);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed To Delete User");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto) {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
                
            var userFromRepo = await _repo.GetUser(userForUpdateDto.id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
        }

        [HttpPut("roles/{id}")]
        public async Task<IActionResult> UpdateUserRoles(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var roleHolder =  userForUpdateDto.UserRoles;
                
            var userFromRepo = await _repo.GetUser(userForUpdateDto.id);

            _userManager.RemoveFromRoleAsync(userFromRepo, "Student").Wait();
            _userManager.RemoveFromRoleAsync(userFromRepo, "Tutor").Wait();
            _userManager.RemoveFromRoleAsync(userFromRepo, "Mentor").Wait();
            _userManager.RemoveFromRoleAsync(userFromRepo, "Admin").Wait();

            foreach (var item in roleHolder)
            {
                switch(item.RoleId)
                {
                    case 1:
                        _userManager.AddToRolesAsync(userFromRepo, new [] {"Student"}).Wait();
                        break;

                    case 2:
                        _userManager.AddToRolesAsync(userFromRepo, new [] {"Tutor"}).Wait();
                        break;

                    case 3:
                        _userManager.AddToRolesAsync(userFromRepo, new [] {"Mentor"}).Wait();
                        break;

                    case 4:
                        _userManager.AddToRolesAsync(userFromRepo, new [] {"Admin"}).Wait();
                        break;
                }
            }

            var roleString = _userManager.GetRolesAsync(userFromRepo).Result;
            userForUpdateDto.UserRoles.Clear();

            foreach (var item in roleString)
            {
                var userRole = new UserRole
                {
                    User = userFromRepo,
                    Role = _roleManager.FindByNameAsync(item).Result
                };
                userForUpdateDto.UserRoles.Add(userRole);
            }

            _mapper.Map(userForUpdateDto, userFromRepo);

                return Ok(userFromRepo);

            throw new Exception($"Updating user {userForUpdateDto.id} failed on save");
        }

        [HttpPut("actscores/{id}")]
        public async Task<IActionResult> UpdateUserActScores(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
                
            var userFromRepo = await _repo.GetUser(userForUpdateDto.id);

            foreach (var score in userForUpdateDto.ActScores)
            {
                userFromRepo.ActScores.Add(score);
            }

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
            
        }

        [HttpDelete("actScores/{id}/authId/{authId}")]
        public async Task<IActionResult> DeleteActScore(int id, int authId)
        {
            if (authId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var actScoreToDelete = await _repo.GetActScore(id);

            _repo.Delete(actScoreToDelete);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Removing ACT score failed on save");
        }




    }
}