using EcommerceSportTravelBE.DTOs.PacchettoViaggio;
using EcommerceSportTravelBE.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceSportTravelBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "SuperAdmin, Admin")]
    public class PacchettoViaggioController : ControllerBase
    {
        private readonly PacchettoViaggioService _pacchettoService;

        public PacchettoViaggioController(PacchettoViaggioService pacchettoService)
        {
            _pacchettoService = pacchettoService;
        }

        //[HttpGet]
        //public async Task<ActionResult<List<PacchettoViaggioListDto>>> GetAll(int page = 0, int pageSize = 10)
        //{
        //    var result = await _pacchettoService.GetAllAsync(page, pageSize);
        //    return Ok(result);
        //}

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Get([FromQuery] Guid? squadraId, int page = 0, int pageSize = 10)
        {
            if (squadraId.HasValue)
            {
                var filtered = await _pacchettoService.SearchBySquadraAsync(squadraId.Value);
                return Ok(filtered);
            }

            var all = await _pacchettoService.GetAllAsync(page, pageSize);
            return Ok(all);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<PacchettoViaggioReadDto>> GetById(Guid id)
        {
            var result = await _pacchettoService.GetByIdAsync(id);
            if (result == null) return NotFound("Pacchetto viaggio non trovato.");
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> Create(PacchettoViaggioCreateDto dto)
        {
            var id = await _pacchettoService.CreateAsync(dto);
            if (id == Guid.Empty)
            {
                return BadRequest("Errore nella creazione del pacchetto viaggio.");
            }
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, PacchettoViaggioUpdateDto dto)
        {
            if (id != dto.Id) return BadRequest("ID non corrispondente.");
            var success = await _pacchettoService.UpdateAsync(dto);
            if (!success) return NotFound("Pacchetto viaggio non trovato.");
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _pacchettoService.DeleteAsync(id);
            if (!success) return NotFound("Pacchetto viaggio non trovato.");
            return NoContent();
        }

        //[HttpGet("search")]
        //public async Task<IActionResult> SearchBySquadraId([FromQuery] Guid squadraId)
        //{
        //    var filtered = await _pacchettoService.SearchBySquadraAsync(squadraId);
        //    return Ok(filtered);
        //}
    }
}
