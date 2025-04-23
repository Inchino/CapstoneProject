using EcommerceSportTravelBE.DTOs.Partita;
using EcommerceSportTravelBE.Services;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceSportTravelBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PartitaController : ControllerBase
    {
        private readonly PartitaService _partitaService;

        public PartitaController(PartitaService partitaService)
        {
            _partitaService = partitaService;
        }

        [HttpGet]
        public async Task<ActionResult<List<PartitaListDto>>> GetAll(int page = 0, int pageSize = 10)
        {
            var result = await _partitaService.GetAllAsync(page, pageSize);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PartitaReadDto>> GetById(Guid id)
        {
            var result = await _partitaService.GetByIdAsync(id);
            if (result == null) return NotFound("Partita non trovata.");
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> Create(PartitaCreateDto dto)
        {
            var id = await _partitaService.CreateAsync(dto);
            if (id == Guid.Empty)
            {
                return BadRequest("Errore nella creazione della partita.");
            }
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, PartitaUpdateDto dto)
        {
            if (id != dto.Id) return BadRequest("ID non corrispondente.");
            var success = await _partitaService.UpdateAsync(dto);
            if (!success) return NotFound("Partita non trovata.");
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _partitaService.DeleteAsync(id);
            if (!success) return NotFound("Partita non trovata.");
            return NoContent();
        }
    }
}
