using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace EcommerceSportTravelBE.Models
{
    public class ApplicationUserRole : IdentityUserRole<string>
    {
        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }

        [ForeignKey(nameof(RoleId))]
        public ApplicationRole Role { get; set; }
    }
}