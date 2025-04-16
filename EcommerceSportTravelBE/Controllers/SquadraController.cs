using EcommerceSportTravelBE.DTOs.Squadra;
using EcommerceSportTravelBE.Services;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceSportTravelBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SquadraController : ControllerBase
    {
        private readonly SquadraService _squadraService;

        public SquadraController(SquadraService squadraService)
        {
            _squadraService = squadraService;
        }

        [HttpGet]
        public async Task<ActionResult<List<SquadraListDto>>> GetAll()
        {
            var result = await _squadraService.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SquadraReadDto>> GetById(Guid id)
        {
            var result = await _squadraService.GetByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> Create(SquadraCreateDto dto)
        {
            var id = await _squadraService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, SquadraUpdateDto dto)
        {
            if (id != dto.Id) return BadRequest();
            var success = await _squadraService.UpdateAsync(dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _squadraService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
