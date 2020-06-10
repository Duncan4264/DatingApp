using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        /*
        * Constructor for Auth Controller
        */
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            this._config = config;
            this._repo = repo;

        }
        /*
        * Method to handle register 
        */
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            // Put the username to lower
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            // check  to see if the user exists
            if (await _repo.UserExists(userForRegisterDto.Username))
            {
                // return a bad request if user exists
                return BadRequest("Username already Exists");
            }
            // Create a new user model otherwise
            var userToCreate = new User
            {
                // make the username user
                Username = userForRegisterDto.Username
            };
            // wait for user method using pirameters  user to create and user DTO password
            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);
              // return status code 201 (temperary)
            return StatusCode(201);
        }
        /*
        * Method to handle logging into the program
        */
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            
            // Wait for response from injected repository
            var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);
           // if response is null return unauthrized
            if (userFromRepo == null)
                return Unauthorized();
           // create a new array of claims
           
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}