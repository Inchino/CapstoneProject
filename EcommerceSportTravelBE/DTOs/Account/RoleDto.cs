using System.ComponentModel.DataAnnotations;

namespace EcommerceSportTravelBE.DTOs.Account
{
    public class RoleDto
    {
        [Required]
        [MaxLength(50)]
        public string RoleName { get; set; }

    }
}
