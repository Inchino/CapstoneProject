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

        [HttpGet("mie")]
        [Authorize(Roles = "SuperAdmin, Admin, User")]
        public async Task<ActionResult<List<PrenotazioneListDto>>> GetMiePrenotazioni()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Utente non autenticato.");

            var result = await _prenotazioneService.GetAllByUserAsync(userId);
            if (result == null || !result.Any())
                return NotFound("Nessuna prenotazione trovata per questo utente.");

            return Ok(result);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin, User")]
        public async Task<ActionResult<PrenotazioneReadDto>> GetById(Guid id)
        {
            var result = await _prenotazioneService.GetByIdAsync(id);
            if (result == null) return NotFound("Prenotazione non trovata.");
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin, Admin, User")]
        public async Task<ActionResult<Guid>> Create(PrenotazioneCreateDto dto)
        {

            if (dto.PrezzoPagato <= 0 || dto.NumeroPartecipanti <= 0)
                return BadRequest("I dati forniti non sono validi.");

            var id = await _prenotazioneService.CreateAsync(dto, User);
            if (id == null) return Unauthorized("Utente non valido.");

            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> Update(Guid id, PrenotazioneUpdateDto dto)
        {
            if (id != dto.Id) return BadRequest("ID della prenotazione non valido.");

            var success = await _prenotazioneService.UpdateAsync(dto);
            if (!success) return NotFound("Prenotazione non trovata.");

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _prenotazioneService.DeleteAsync(id);
            if (!success) return NotFound("Prenotazione non trovata.");
            return NoContent();
        }
    }
}
