using EcommerceSportTravelBE.DTOs.Account;
using EcommerceSportTravelBE.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceSportTravelBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerDto)
        {
            var result = await _authService.RegisterAsync(registerDto);
            if (!result)
                return BadRequest("Registrazione fallita.");
            return Ok("Registrazione completata.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginDto)
        {
            var (success, tokenOrMessage) = await _authService.LoginAsync(loginDto);
            if (!success)
                return Unauthorized(tokenOrMessage);
            return Ok(new { token = tokenOrMessage });
        }

        [HttpGet("roles")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _authService.GetRolesAsync();
            if (roles == null)
                return NotFound("Nessun ruolo trovato.");
            return Ok(roles);
        }

        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _authService.GetUsersAsync();
            if (users == null)
                return NotFound("Nessun utente trovato.");
            return Ok(users);
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var user = await _authService.GetCurrentUserAsync(User);
            if (user == null)
                return NotFound("Utente non trovato.");
            return Ok(new
            {
                user.Id,
                user.Name,
                user.Surname,
                user.Email
            });
        }
    }
}
