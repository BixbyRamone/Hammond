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
    public class EventsController : ControllerBase
    {
        private readonly IHammondRepository _repo;
        private readonly IMapper _mapper;
        public EventsController(IHammondRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;            
        }

        [HttpGet("{id}", Name="GetEvent")]
        public async Task<IActionResult> GetEvent(int id)
        {
            var eventFromRepo = await _repo.GetEvent(id);

            if (eventFromRepo == null)
                return NotFound();

            return Ok(eventFromRepo);
        }

        [HttpGet]
        public async Task<IActionResult> GetEvents([FromQuery]UserParams userParams)
        {
            var evnts = await _repo.GetEvents(userParams);

            Response.AddPagination(evnts.CurrentPage,  evnts.PageSize, evnts.TotalCount, evnts.TotalPages);

            return Ok(evnts);
        }

        [HttpPost("{creatorId}")]
        public async Task<IActionResult> CreateEvent(int creatorId, [FromBody]EventForCreationDto eventForCreationDto)
        {
            var eventCreator = await _repo.GetUser(creatorId);

            // if (eventCreator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

                var evnt = _mapper.Map<Event>(eventForCreationDto);

                evnt.CreatedBy = eventCreator;

                _repo.Add(evnt);

                if (await _repo.SaveAll())
            {
                var eventToReturn = _mapper.Map<EventToReturnDto>(evnt);
                return CreatedAtRoute("GetEvent", new {id = evnt.Id}, eventToReturn);
            }

            throw new Exception("Creating the assignment failed on save");
        }
    }
}