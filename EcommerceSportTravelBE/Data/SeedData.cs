using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using EcommerceSportTravelBE.Models;

namespace EcommerceSportTravelBE.Data
{
    public static class SeedData
    {
        public static async Task InitializeAsync(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();

            string[] roles = new[] { "SuperAdmin", "Admin", "User" };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new ApplicationRole { Name = role });
                }
            }

            // Crea SuperAdmin
            var superAdminEmail = "superadmin@goalaway.com";
            var superAdmin = await userManager.FindByEmailAsync(superAdminEmail);
            if (superAdmin == null)
            {
                superAdmin = new ApplicationUser
                {
                    UserName = "SuperAdmin",
                    NormalizedUserName = "SUPERADMIN",
                    Email = superAdminEmail,
                    NormalizedEmail = superAdminEmail.ToUpper(),
                    EmailConfirmed = true,
                    Name = "SuperAdmin",
                    Surname = "Default",
                    BirthDate = new DateOnly(2002, 3, 2)
                };

                await userManager.CreateAsync(superAdmin, "SuperAdmin123!");
                await userManager.AddToRoleAsync(superAdmin, "SuperAdmin");
            }

            // Crea Admin
            var adminEmail = "admin@goalaway.com";
            var admin = await userManager.FindByEmailAsync(adminEmail);
            if (admin == null)
            {
                admin = new ApplicationUser
                {
                    UserName = "Admin",
                    NormalizedUserName = "ADMIN",
                    Email = adminEmail,
                    NormalizedEmail = adminEmail.ToUpper(),
                    EmailConfirmed = true,
                    Name = "Admin",
                    Surname = "Default",
                    BirthDate = new DateOnly(2000, 7, 27)
                };

                await userManager.CreateAsync(admin, "Admin123!");
                await userManager.AddToRoleAsync(admin, "Admin");
            }
        }
    }
}
