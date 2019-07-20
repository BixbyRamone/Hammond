using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Hammond.API.Data;
using Hammond.API.Dtos;
using Hammond.API.Helpers;
using Hammond.API.Models;
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

        [HttpPost("{creatorId}")]
        public async Task<IActionResult> CreateAssignment(int creatorId, [FromBody]AssignmentForCreationDto assignmentForCreationDto)
        {
            var assignmentCreator = await _repo.GetUser(creatorId);

            if (assignmentCreator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            assignmentForCreationDto.CreatedBy = assignmentCreator;
            // var assignment = _mapper.Map<Assignment>(assignmentForCreationDto);

            // var usersToAssognTo = _repo.GetUsers();

            var assignment = new Assignment
            {
                Title = assignmentForCreationDto.Title,
                Content = assignmentForCreationDto.Content,
                StudentLevel = assignmentForCreationDto.StudentLevel,
                Section = assignmentForCreationDto.Section,
                DateAssigned = assignmentForCreationDto.DateAssigned,
                DateDue = assignmentForCreationDto.DateDue,
                Assigned = assignmentForCreationDto.Assigned,
                CreatedBy = assignmentForCreationDto.CreatedBy
            };

            if (assignment.Assigned)
                assignment.DateAssigned = DateTime.Now;

            var userParams = new UserParams()
            {
                StudentLevel = assignmentForCreationDto.StudentLevel,
                PageSize = 50
            };
            var students = _repo.GetUsers(userParams);

            _repo.Add(assignment);

            if (await _repo.SaveAll())
            {
                var assignmentToReturn = _mapper.Map<AssignmentToReturnDto>(assignment);
                return CreatedAtRoute("GetAssignment", new {id = assignment.Id}, assignmentToReturn);
            }

            throw new Exception("Creating the assignment failed on save");
        }

        [HttpGet("{id}", Name="GetAssignment")]
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