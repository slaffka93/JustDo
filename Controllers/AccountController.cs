using JustDo.Logic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace JustDo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UsersContext _usersContext;
        private readonly JwtOptions _options;
        private const string _salt = "u816pAhcpl";

        public AccountController(UsersContext usersContext, IOptions<JwtOptions> options)
        {
            _usersContext = usersContext;
            _options = options.Value;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody]CreateUserRequest request)
        {
            var existedUser = await _usersContext.Users.SingleOrDefaultAsync(
                x => x.Email.ToLower() == request.Email.ToLower());
            if (existedUser != null)
            {
                return BadRequest($"User with mail {request.Email} already exists");
            }

            var user = await _usersContext.Users.AddAsync(new User
            {
                Email = request.Email,
                Password = HashPassword(request.Password),
            });
            await _usersContext.SaveChangesAsync();
            var token = CreateToken(request.Email);
            return Ok(new { token });
        }

        [AllowAnonymous]
        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] CreateUserRequest request)
        {
            var existedUser = await _usersContext.Users.SingleOrDefaultAsync(
                x => x.Email.ToLower() == request.Email.ToLower());
            if (existedUser == null)
            {
                return BadRequest($"User with mail {request.Email} does not exist");
            }

            var hashedPassword = HashPassword(request.Password);
            if (existedUser.Password != hashedPassword)
            {
                return BadRequest("Invalid password");
            }

            var token = CreateToken(request.Email);
            return Ok(new { token });
        }

        private string HashPassword(string password)
        {
            var bytes = Encoding.UTF8.GetBytes(_salt + password);
            var hash = SHA256.Create().ComputeHash(bytes);
            return string.Join("", hash.Select(x => x.ToString("x2")));
        }

        public string CreateToken(string mail)
        {
            var now = DateTime.UtcNow;
            var signing = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_options.Secret)),
                SecurityAlgorithms.HmacSha256
                );
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, mail)
            };

            var jwt = new JwtSecurityToken(
                        issuer: _options.Issuer,
                        audience: _options.Audience,
                        notBefore: now,
                        claims: claims,
                        signingCredentials: signing
                        );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
