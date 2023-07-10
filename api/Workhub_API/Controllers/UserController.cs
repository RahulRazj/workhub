using Microsoft.AspNetCore.Mvc;
using System.Net;
using Workhub_API.Models;
using Workhub_API.Models.Dto;
using Workhub_API.Repository.IRepository;

namespace Workhub_API.Controllers
{
    [Route("/api/auth")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepo;
        protected ApiResponse _response;

        private string secretKey;

        public UserController(IUserRepository userRepo, IConfiguration configuration)
        {
            _userRepo = userRepo;
            _response = new ApiResponse();
            secretKey = configuration.GetValue<string>("ApiSettings:SecretKey");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto model)
        {
            var loginResponse = await _userRepo.Login(model, this.secretKey);
            if(loginResponse.User == null || String.IsNullOrEmpty(loginResponse.AccessToken))
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Username or password is incorrect");
                return BadRequest(_response);
            }

            loginResponse.User.Password = "";
            _response.IsSuccess = true;
            _response.StatusCode = HttpStatusCode.OK;
            _response.Result = loginResponse;
            return Ok(_response);
        }


        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequestDto model)
        {
            bool ifUserIsUnique = _userRepo.IsUniqueUser(model.Username, model.Email);
            if(!ifUserIsUnique) {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("User already exists");
                return BadRequest(_response);
            }

            var user = await _userRepo.Signup(model);
            if(user == null)
            {
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Error signing up");
                return BadRequest(_response);
            }
            _response.IsSuccess = true;
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }
    }
}
