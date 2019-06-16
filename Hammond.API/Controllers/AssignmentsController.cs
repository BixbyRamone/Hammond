using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Hammond.API.Data;
using Hammond.API.Dtos;
using Hammond.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hammond.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentsController : ControllerBase
    {
        private readonly IHammondRepository _repo;
        private readonly IMapper _mapper;
        public AssignmentsController(IHammondRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAssignment(int id)
        {
            var assignmentFromRepo = await _repo.GetAssignment(id);

            if (assignmentFromRepo == null)
                return NotFound();

            return Ok(assignmentFromRepo);
        }

        [HttpGet]
        public async Task<IActionResult> GetAssignments([FromQuery]AssignmentParams assignmentParams)
        {
            var assignments = await _repo.GetAssignments(assignmentParams);

            var assignmentsToReturn = _mapper.Map<IEnumerable<AssignmentForListDto>>(assignments);

            Response.AddPagination(assignments.CurrentPage, assignments.PageSize,
                                    assignments.TotalCount, assignments.TotalPages);

            return  Ok(assignmentsToReturn);
        }

    }
}