using EcommerceSportTravelBE.Models;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

public class ApplicationUserRole : IdentityUserRole<string>
{
    [ForeignKey(nameof(UserId))]
    public ApplicationUser? User { get; set; }

    [ForeignKey(nameof(RoleId))]
    public ApplicationRole? Role { get; set; }
}
