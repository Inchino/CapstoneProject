using EcommerceSportTravelBE.DTOs.Account;
using EcommerceSportTravelBE.Models;
using EcommerceSportTravelBE.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class AuthService
{
    private readonly JwtSettings _jwtSettings;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly RoleManager<ApplicationRole> _roleManager;

    public AuthService(IOptions<JwtSettings> jwtOptions,
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        RoleManager<ApplicationRole> roleManager)
    {
        _jwtSettings = jwtOptions.Value;
        _userManager = userManager;
        _signInManager = signInManager;
        _roleManager = roleManager;
    }

    public async Task<List<RoleDto>> GetRolesAsync()
    {
        try
        {
            var roles = await _roleManager.Roles.ToListAsync();

            if (roles == null || roles.Count == 0)
            {
                return new List<RoleDto>();
            }

            var roleDtos = roles.Select(role => new RoleDto
            {
                RoleName = role.Name,
            }).ToList();

            return roleDtos;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[GetRolesAsync] Errore: {ex.Message}");
            return null;
        }
    }

    public async Task<bool> RegisterAsync(RegisterRequestDto registerRequest)
    {
        try
        {
            var roleExist = await _roleManager.RoleExistsAsync(registerRequest.Role);
            if (!roleExist)
            {
                return false;
            }

            var newUser = new ApplicationUser
            {
                Email = registerRequest.Email,
                UserName = registerRequest.Email,
                Name = registerRequest.Name,
                Surname = registerRequest.Surname,
                BirthDate = registerRequest.BirthDate
            };

            var result = await _userManager.CreateAsync(newUser, registerRequest.Password);

            if (!result.Succeeded)
            {
                return false;
            }

            await _userManager.AddToRoleAsync(newUser, registerRequest.Role);

            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[RegisterAsync] Errore: {ex.Message}");
            return false;
        }
    }

    public async Task<(bool, string)> LoginAsync(LoginRequestDto loginRequest)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(loginRequest.Email);

            if (user == null)
            {
                return (false, "Email non trovata");
            }

            var result = await _signInManager.PasswordSignInAsync(user, loginRequest.Password, false, false);

            if (!result.Succeeded)
            {
                return (false, "Password errata");
            }

            var roles = await _userManager.GetRolesAsync(user);

            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, $"{user.Name} {user.Surname}")
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecurityKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiry = DateTime.Now.AddMinutes(_jwtSettings.ExpiresInMinutes);

            var token = new JwtSecurityToken(
                _jwtSettings.Issuer,
                _jwtSettings.Audience,
                claims,
                expires: expiry,
                signingCredentials: creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return (true, tokenString);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[LoginAsync] Errore: {ex.Message}");
            return (false, "Errore durante l'autenticazione");
        }
    }

    public async Task<List<UserDto>> GetUsersAsync(int page = 0, int pageSize = 10)
    {
        try
        {
            var users = await _userManager.Users
                .Skip(page * pageSize)
                .Take(pageSize)
                .Include(u => u.ApplicationUserRoles)
                .ThenInclude(ur => ur.Role)
                .ToListAsync();

            var userDtos = users.Select(user => new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email!,
                Role = user.ApplicationUserRoles.FirstOrDefault()?.Role?.Name ?? "Nessun ruolo"
            }).ToList();

            return userDtos;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[GetUsersAsync] Errore: {ex.Message}");
            return null;
        }
    }

    public async Task<ApplicationUser?> GetCurrentUserAsync(ClaimsPrincipal user)
    {
        var userId = _userManager.GetUserId(user);
        return await _userManager.FindByIdAsync(userId);
    }
}
