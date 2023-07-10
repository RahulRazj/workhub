using Workhub_API.Models;
using Workhub_API.Models.Dto;

namespace Workhub_API.Repository.IRepository
{
    public interface IUserRepository
    {
        bool IsUniqueUser(string username, string email);
        Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto, string secretKey);
        Task<User> Signup(SignupRequestDto signupRequestDto);
    }
}
