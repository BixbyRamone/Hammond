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
    public class SessionsController : ControllerBase
    {
        private readonly IHammondRepository _repo;
        private readonly IMapper _mapper;
        public SessionsController(IHammondRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> CreateSession(int id, [FromBody]SessionForCreationDto sessionForCreationDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
                // sessionForCreationDto.DayOfSession = null;

            if (sessionForCreationDto.DayOfSession == null)
            {
                sessionForCreationDto.DayOfSession = DateTime.Today.AddDays(((int)DayOfWeek.Saturday) - (int)DateTime.Today.DayOfWeek);
            }

            UserParams userParamsForDelete = new UserParams();
            userParamsForDelete.StudentLevel = sessionForCreationDto.StudentLevel;
            userParamsForDelete.OlderSessionsDelete = true;

            var sessionsToDelete = await _repo.GetSessions(userParamsForDelete);

            var session = _mapper.Map<Session>(sessionForCreationDto);

            _repo.Add(session);

            foreach (var assignment in sessionForCreationDto.Assignments)
            {
                SessionAssignment sessionAssignment = new SessionAssignment
                {
                    SessionId = session.Id,
                    AssignmentId = assignment.Id
                };

                _repo.Add(sessionAssignment);
            }

             if (await _repo.SaveAll())
            {
                var sessionToReturn = _mapper.Map<SessionToReturnDto>(session);

                return CreatedAtRoute("GetSession", new {id = session.Id}, sessionToReturn);
            }
    
            // add imapper profile
            // map to obj

            return Ok();
        }

        [HttpGet("{id}", Name="GetSession")]
        public async Task<IActionResult> GetSession(int id)
        {
            var sessionFromRepo = await _repo.GetSession(id);

            if (sessionFromRepo == null)
                return NotFound();

            return Ok(sessionFromRepo);
        }

        [HttpGet("next")]
        public async Task<IActionResult> GetNextSession([FromQuery]UserParams userParams)
        {
            var sessionFromRepo = await _repo.GetNextSession(userParams);

            if (sessionFromRepo == null)
                return NotFound();

            return Ok(sessionFromRepo);
        }

        [HttpGet()]
        public async Task<IActionResult> GetSessions([FromQuery]UserParams userParams)
        {
            
            if (userParams.GetNextSession)
            {
                var session = await _repo.GetNextSession(userParams);
                return Ok(session);
            }
            else
            {
                var sessions = await _repo.GetSessions(userParams);
                var sessionsToReturn = _mapper.Map<IEnumerable<SessionToReturnDto>>(sessions);

                Response.AddPagination(sessions.CurrentPage, sessions.PageSize, sessions.TotalCount, sessions.TotalPages);

                return Ok(sessionsToReturn);
            }
            

            
        }
    }
}