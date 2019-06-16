using System.Threading.Tasks;
using AutoMapper;
using Hammond.API.Data;
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

        
    }
}