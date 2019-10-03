using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Hammond.API.Data;
using Hammond.API.Helpers;
using Hammond.API.Dtos;
using Hammond.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hammond.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly IHammondRepository _repo;
        private readonly IMapper _mapper;
        public GroupsController(IHammondRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;            
        }

        [HttpPost()]
        public async Task<IActionResult> CreateGroup(/*int userId, */[FromBody]GroupForCreationDto groupForCreationDto)
        {
            List<User> volunteers = new List<User>();
            foreach (var volIds in groupForCreationDto.VolunteerIds)
            {
                var volunteer = await _repo.GetUser(volIds);
                volunteers.Add(volunteer);
            }

            List<User> students = new List<User>();
            foreach (var studIds in groupForCreationDto.StudentIds)
            {
                var student = await _repo.GetUser(studIds);
                students.Add(student);
            }

            Group newGroup = new Group();
            _repo.Add(newGroup);

            foreach(var user in volunteers)
            {
                UserGroup userGroup = new UserGroup
                {
                    // User = user,
                    UserId = user.Id,
                    // Group = newGroup,
                    GroupId = newGroup.Id
                };

                _repo.Add(userGroup);
            }

            foreach(var user in students)
            {
                UserGroup userGroup = new UserGroup
                {
                    // User = user,
                    UserId = user.Id,
                    // Group = newGroup,
                    GroupId = newGroup.Id
                };

                _repo.Add(userGroup);
            }
            
            if (await _repo.SaveAll())
            {
                return Ok(newGroup);
            }
            
            throw new Exception("Creating the assignment failed on save");
            
        }

        [HttpGet()]
        public async Task<IActionResult> GetGroups([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var usersFromRepo = await _repo.GetUser(currentUserId);

            userParams.UserId = currentUserId;

            var groups = await _repo.GetGroups(userParams);

            var groupsToReturn = _mapper.Map<IEnumerable<GroupForListDto>>(groups);

            Response.AddPagination(groups.CurrentPage, groups.PageSize, groups.TotalCount, groups.TotalPages);

            return Ok(groupsToReturn);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroup(int id)
        {
            var group = await _repo.GetGroup(id);

            return Ok(group);
        } 
    }
}