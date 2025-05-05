using EcommerceSportTravelBE.DTOs.Squadra;
using EcommerceSportTravelBE.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceSportTravelBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "SuperAdmin, Admin")]
    public class SquadraController : ControllerBase
    {
        private readonly SquadraService _squadraService;

        public SquadraController(SquadraService squadraService)
        {
            _squadraService = squadraService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<SquadraListDto>>> GetAll(int page = 0, int pageSize = 20)
        {
            var result = await _squadraService.GetAllAsync(page, pageSize);
            return Ok(result);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<SquadraReadDto>> GetById(Guid id)
        {
            var result = await _squadraService.GetByIdAsync(id);
            if (result == null) return NotFound("Squadra non trovata.");
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> Create(SquadraCreateDto dto)
        {
            var id = await _squadraService.CreateAsync(dto);
            if (id == Guid.Empty)
            {
                return BadRequest("Errore nella creazione della squadra.");
            }
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, SquadraUpdateDto dto)
        {
            if (id != dto.Id) return BadRequest("ID non corrispondente.");
            var success = await _squadraService.UpdateAsync(dto);
            if (!success) return NotFound("Squadra non trovata.");
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _squadraService.DeleteAsync(id);
            if (!success) return NotFound("Squadra non trovata.");
            return NoContent();
        }
    }
}
