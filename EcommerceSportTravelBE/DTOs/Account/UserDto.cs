using System.ComponentModel.DataAnnotations;

namespace EcommerceSportTravelBE.DTOs.Account
{
    public class UserDto
    {
        [Required]
        public string Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string Surname { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MaxLength(50)]
        public string Role { get; set; }
    }
}
