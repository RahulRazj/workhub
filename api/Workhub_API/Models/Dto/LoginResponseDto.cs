namespace Workhub_API.Models.Dto
{
    public class LoginResponseDto
    {
        public User User { get; set; }
        public string AccessToken { get; set; }
    }
}
