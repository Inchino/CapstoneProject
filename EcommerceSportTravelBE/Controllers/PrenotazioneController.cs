using EcommerceSportTravelBE.DTOs.Prenotazione;
using EcommerceSportTravelBE.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EcommerceSportTravelBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrenotazioneController : ControllerBase
    {
        private readonly PrenotazioneService _prenotazioneService;

        public PrenotazioneController(PrenotazioneService prenotazioneService)
        {
            _prenotazioneService = prenotazioneService;
        }

        // ✅ Accessibile solo da utente loggato
        [Authorize]
        [HttpGet("mie")]
        public async Task<ActionResult<List<PrenotazioneListDto>>> GetMiePrenotazioni()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _prenotazioneService.GetAllByUserAsync(userId);
            return Ok(result);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<PrenotazioneReadDto>> GetById(Guid id)
        {
            var result = await _prenotazioneService.GetByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Guid>> Create(PrenotazioneCreateDto dto)
        {
            var id = await _prenotazioneService.CreateAsync(dto, User);
            if (id == null) return Unauthorized("Utente non valido");
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, PrenotazioneUpdateDto dto)
        {
            if (id != dto.Id) return BadRequest();
            var success = await _prenotazioneService.UpdateAsync(dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _prenotazioneService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
