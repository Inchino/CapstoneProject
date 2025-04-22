using Microsoft.AspNetCore.Identity;

namespace EcommerceSportTravelBE.Models
{
    public class ApplicationRole : IdentityRole
    {
        public ICollection<ApplicationUserRole> ApplicationUserRoles { get; set; } = new List<ApplicationUserRole>();
    }
}
