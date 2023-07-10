using System.ComponentModel.DataAnnotations;

namespace Workhub_API.Models.Dto
{
    public class UserDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
