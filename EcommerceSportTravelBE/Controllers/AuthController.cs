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
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerDto)
        {
            var result = await _authService.RegisterAsync(registerDto);
            if (!result)
                return BadRequest("Registrazione fallita: verifica l'email o i dati inseriti.");
            return Ok("Registrazione completata.");
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginDto)
        {
            var (success, tokenOrMessage) = await _authService.LoginAsync(loginDto);
            if (!success)
                return Unauthorized(tokenOrMessage);
            return Ok(new { token = tokenOrMessage });
        }

        [HttpGet("roles")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _authService.GetRolesAsync();
            if (roles == null || roles.Count == 0)
                return NotFound("Nessun ruolo trovato.");
            return Ok(roles);
        }

        [HttpGet("users")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> GetUsers(int page = 0, int pageSize = 10)
        {
            var users = await _authService.GetUsersAsync(page, pageSize);
            if (users == null || users.Count == 0)
                return NotFound("Nessun utente trovato.");
            return Ok(users);
        }

        [HttpGet("me")]
        [Authorize(Roles = "SuperAdmin, Admin, User")]
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
