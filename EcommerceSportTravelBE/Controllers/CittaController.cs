using EcommerceSportTravelBE.DTOs.Citta;
using EcommerceSportTravelBE.Services;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceSportTravelBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CittaController : ControllerBase
    {
        private readonly CittaService _cittaService;

        public CittaController(CittaService cittaService)
        {
            _cittaService = cittaService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CittaListDto>>> GetAll(int page = 0, int pageSize = 10)
        {
            var result = await _cittaService.GetAllAsync(page, pageSize);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CittaReadDto>> GetById(Guid id)
        {
            var result = await _cittaService.GetByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> Create(CittaCreateDto dto)
        {
            var id = await _cittaService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, CittaUpdateDto dto)
        {
            if (id != dto.Id) return BadRequest();
            var success = await _cittaService.UpdateAsync(dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _cittaService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
