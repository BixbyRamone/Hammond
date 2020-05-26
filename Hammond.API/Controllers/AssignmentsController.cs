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
            var assignment = _mapper.Map<Assignment>(assignmentForCreationDto);

            if (assignment.Assigned)
                assignment.DateAssigned = DateTime.Now;
            
            var students = _repo.GetStudents(assignmentForCreationDto.StudentLevel);

            _repo.Add(assignment);

            foreach(var student in students.Result)
            {
                var userAssignment = new UserAssignment(){
                    UserId = student.Id,
                    AssignmentId = assignment.Id,
                    Completed = false
                };

                if (!student.UserAssignments.Contains(userAssignment))
                _repo.Add(userAssignment);
            }            
            
            if (await _repo.SaveAll())
            {
                // _repo.SqlCmdHelper("SET IDENTITY_INSERT dbo.UserAssignments OFF");
                var assignmentToReturn = _mapper.Map<AssignmentToReturnDto>(assignment);
                return CreatedAtRoute("GetAssignment", new {id = assignment.Id}, assignmentToReturn);
            }

            throw new Exception("Creating the assignment failed on save");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAssignment(int id, AssignmentForUpdateDto assignmentForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

                var assignmentFromRepo = await _repo.GetAssignment(assignmentForUpdateDto.Id);

            assignmentFromRepo.Title = assignmentForUpdateDto.Title;
            assignmentFromRepo.Content = assignmentForUpdateDto.Content;
            assignmentFromRepo.StudentLevel = assignmentForUpdateDto.StudentLevel;
            assignmentFromRepo.Section = assignmentForUpdateDto.Section;
            assignmentFromRepo.DateDue = assignmentForUpdateDto.DateDue;
            assignmentFromRepo.Assigned = assignmentForUpdateDto.Assigned;
            assignmentFromRepo.Subject = assignmentForUpdateDto.Subject;
                

                if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating assignment {id} failed on save");
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

        [HttpDelete("{id}/authId/{userId}")]
        public async Task<IActionResult> DeleteAssignment(int id, int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var assignment = await _repo.GetAssignment(id);

            _repo.Delete(assignment);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed To Delete User");
        }

    }
}