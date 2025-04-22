using System.ComponentModel.DataAnnotations;

namespace EcommerceSportTravelBE.DTOs.Account
{
    public class LoginRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public required string Password { get; set; }
    }
}
