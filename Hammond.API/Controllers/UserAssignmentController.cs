using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Hammond.API.Data;
using Hammond.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hammond.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class UserAssignmentController : ControllerBase
    {
        private readonly IHammondRepository _repo;
        private readonly IMapper _mapper;
        public UserAssignmentController(IHammondRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserAssignment(int id)
        {
            var assignment = await _repo.GetUserAssignment(id);

            return Ok(assignment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserAssignment(int id, UserAssignment userAssignment)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userAssignmentFromRepo = await _repo.GetUserAssignment(userAssignment.AssignmentId);
            userAssignmentFromRepo.Completed = userAssignment.Completed;

             if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating UserAssignment {id} failed on save");
        }

        
    }
}