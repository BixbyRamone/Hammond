using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CsvHelper;
using Hammond.API.Data;
using Hammond.API.Dtos;
using Hammond.API.Helpers;
using Hammond.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Hammond.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;
        private readonly DataContext _context;

        public AuthController(
            IAuthRepository repo,
            IMapper mapper,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration config,
            DataContext context)
        {
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _repo = repo;
            _context = context;
        }

        [HttpPost("register/{userRole}")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto, string userRole)
        {
            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var assignments = await _context.Assignments.Where(a => a.StudentLevel == userToCreate.StudentLevel).ToListAsync();

            var result = await _userManager.CreateAsync(userToCreate, userForRegisterDto.Password);

            var userToReturn = _mapper.Map<UserForDetailedDto>(userToCreate);

            foreach(var assignment in assignments)
            {
                var userAssignment = new UserAssignment
                {
                    UserId = userToReturn.Id,
                    AssignmentId = assignment.Id,
                    Completed = false
                };
                _context.Add(userAssignment);
            }

            if (result.Succeeded)
            {
                switch (userRole)
                {
                    case "student":
                        _userManager.AddToRolesAsync(userToCreate, new [] {"Student"}).Wait();
                        break;
                    
                    case "tutor":
                        _userManager.AddToRolesAsync(userToCreate, new [] {"Tutor"}).Wait();
                        break;

                    case "mentor":
                        _userManager.AddToRolesAsync(userToCreate, new [] {"Mentor"}).Wait();
                        break;

                    case "admin":
                        _userManager.AddToRolesAsync(userToCreate, new [] {"Admin"}).Wait();
                        break;
                }
                return CreatedAtRoute("GetUser",
                        new { controller = "Users", id = userToCreate.Id }, userToReturn);
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("registerxls/{id}/{roleToReg}")]
        public async Task<IActionResult> MassUpload(int id, string roleToReg, [FromForm]XlsForUploadDto xlsForUploadDto){

            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            Stream stream = xlsForUploadDto.File.OpenReadStream();
            UserParams userParams = new UserParams();
            userParams.RoleName = roleToReg;

            List<string> cohorts = new List<string>();
            List<string> lastNames = new List<string>();
            List<string> firstNames = new List<string>();
            List<string> emails = new List<string>();
            List<string> streetAdress = new List<string>();
            List<string> city = new List<string>();
            List<User> userList = new List<User>();
            List<string> userNames = new List<string>();
            var usersFromDb = _context.Users.ToList();
            int it = 1;

            using (var reader = new StreamReader(stream))
                {
                    while (!reader.EndOfStream)
                    {
                        var line = reader.ReadLine();
                        var values = line.Split(',');

                        cohorts.Add(values[0]);
                        lastNames.Add(values[1]);
                        firstNames.Add(values[2]);
                        emails.Add(values[9]);
                        streetAdress.Add(values[11]);
                        city.Add(values[12]);
                    }
                    Console.WriteLine("Stop");       
                }

                while(it <= lastNames.Count)
                {
                    // if (firstNames[it] == "Eamon")
                    // {
                    //     Console.WriteLine("Test");
                    // }
                    if (lastNames[it] != "")
                    {
                        string userName = UserNameGenerator.ReturnUserName(firstNames[it], lastNames[it], usersFromDb, userNames).Trim();
                        userNames.Add(userName);
                        string sL = StudLevCalc.ReturnStudLev(cohorts, it);
                        string pw = UserNameGenerator.ReturnPassword(streetAdress[it], city[it]).Trim();
                        
                        UserForRegisterDto userFromFile = new UserForRegisterDto
                        {
                            FirstName = firstNames[it].Trim(),
                            LastName = lastNames[it].Trim(),
                            Email = emails[it].Trim(),
                            StudentLevel = sL,
                            Username = userName,
                            Password = pw,
                        };

                        var userToCreate = _mapper.Map<User>(userFromFile);

                        var assignments = await _context.Assignments.Where(a => a.StudentLevel == userToCreate.StudentLevel).ToListAsync();

                        var result = await _userManager.CreateAsync(userToCreate, userFromFile.Password);

                        var userToReturn = _mapper.Map<UserForDetailedDto>(userToCreate);

                        if (result.Succeeded)
                        {
                            foreach(var assignment in assignments)
                            {
                                var userAssignment = new UserAssignment
                                {
                                    UserId = userToReturn.Id,
                                    AssignmentId = assignment.Id,
                                    Completed = false
                                };
                                _context.Add(userAssignment);
                            }

                            switch (roleToReg)
                            {
                                case "student":
                                    _userManager.AddToRolesAsync(userToCreate, new [] {"Student"}).Wait();
                                    break;
                                
                                case "tutor":
                                    _userManager.AddToRolesAsync(userToCreate, new [] {"Tutor"}).Wait();
                                    break;

                                case "mentor":
                                    _userManager.AddToRolesAsync(userToCreate, new [] {"Mentor"}).Wait();
                                    break;

                                case "admin":
                                    _userManager.AddToRolesAsync(userToCreate, new [] {"Admin"}).Wait();
                                    break;
                            }
                        }
                    }
                    it++;
                }
               
            return Ok();
            throw new Exception("");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _userManager.FindByNameAsync(userForLoginDto.Username);

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, userForLoginDto.Password, false);

            if (result.Succeeded)
            {
                var appUser = await _userManager.Users
                .Include(u => u.UserAssignments)
                    .ThenInclude(ua => ua.Assignment)
                .Include(u => u.UserGroups)
                    .ThenInclude(ug => ug.User)
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.NormalizedUserName == userForLoginDto.Username.ToUpper());

                var userToReturn = _mapper.Map<UserToReturnDto>(appUser);

                return Ok(new
                {
                    token = GenerateJwtToken(appUser).Result,
                    user = userToReturn
                });
            }

            return Unauthorized();
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>// claims for token
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            //key is for signing token to make sure it is valid used for signing credentials
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            //key encripted with hashing algorithm
            

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var rtrn = tokenHandler.WriteToken(token);
            // return rtrn;
            return tokenHandler.WriteToken(token);
        }
    }
}