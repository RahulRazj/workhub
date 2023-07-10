using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Workhub_API.Data;
using Workhub_API.Models;
using Workhub_API.Models.Dto;
using Workhub_API.Repository.IRepository;
using Microsoft.Extensions.Configuration;

namespace Workhub_API.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _db;

        public UserRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public bool IsUniqueUser(string username, string email)
        {
            var user = _db.Users.FirstOrDefault(x => x.Username == username || x.Email == email);
            return user == null;
        }

        public async Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto, string secretKey)
        {
            var user = _db.Users.FirstOrDefault(u => (u.Username == loginRequestDto.Email || u.Email == loginRequestDto.Email));
            if (user == null)
            {
                return new LoginResponseDto
                {
                    User = null,
                    AccessToken = ""
                };
            }

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(loginRequestDto.Password, user.Password);
            if(!isValidPassword)
            {
                return new LoginResponseDto
                {
                    User = null,
                    AccessToken = ""
                };
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var accessToken = tokenHandler.CreateToken(tokenDescriptor);

            LoginResponseDto loginResponseDto = new()
            {
                User = user,
                AccessToken = tokenHandler.WriteToken(accessToken)
            };

            return loginResponseDto;
        }

        public async Task<User> Signup(SignupRequestDto signupRequestDto)
        {
            User user = new()
            {
                Username = signupRequestDto.Username,
                Email = signupRequestDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(signupRequestDto.Password),
                Role = "user",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            user.Password = "";
            return user;
        }

    }
}
