using EcommerceSportTravelBE.DTOs.PacchettoViaggio;
using EcommerceSportTravelBE.Services;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceSportTravelBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PacchettoViaggioController : ControllerBase
    {
        private readonly PacchettoViaggioService _pacchettoService;

        public PacchettoViaggioController(PacchettoViaggioService pacchettoService)
        {
            _pacchettoService = pacchettoService;
        }

        [HttpGet]
        public async Task<ActionResult<List<PacchettoViaggioListDto>>> GetAll()
        {
            var result = await _pacchettoService.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PacchettoViaggioReadDto>> GetById(Guid id)
        {
            var result = await _pacchettoService.GetByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> Create(PacchettoViaggioCreateDto dto)
        {
            var id = await _pacchettoService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, PacchettoViaggioUpdateDto dto)
        {
            if (id != dto.Id) return BadRequest();
            var success = await _pacchettoService.UpdateAsync(dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _pacchettoService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
