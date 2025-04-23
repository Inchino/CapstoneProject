using EcommerceSportTravelBE.Data;
using EcommerceSportTravelBE.DTOs.Squadra;
using EcommerceSportTravelBE.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceSportTravelBE.Services
{
    public class SquadraService
    {
        private readonly EcommerceDbContext _context;

        public SquadraService(EcommerceDbContext context)
        {
            _context = context;
        }

        public async Task<List<SquadraListDto>> GetAllAsync(int page = 0, int pageSize = 10)
        {
            try
            {
                return await _context.Squadre
                    .Skip(page * pageSize)
                    .Take(pageSize)
                    .Include(s => s.Citta)
                    .Select(s => new SquadraListDto
                    {
                        Id = s.Id,
                        Nome = s.Nome,
                        CittaNome = s.Citta != null ? s.Citta.Nome : null,
                        LogoUrl = s.LogoUrl
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[GetAllAsync] Errore: {ex.Message}");
                return new List<SquadraListDto>();
            }
        }

        public async Task<SquadraReadDto?> GetByIdAsync(Guid id)
        {
            try
            {
                var entity = await _context.Squadre
                    .Include(s => s.Citta)
                    .FirstOrDefaultAsync(s => s.Id == id);

                if (entity == null) return null;

                return new SquadraReadDto
                {
                    Id = entity.Id,
                    Nome = entity.Nome,
                    LogoUrl = entity.LogoUrl,
                    Stadio = entity.Stadio,
                    ColoreMaglia = entity.ColoreMaglia,
                    CittaId = entity.CittaId,
                    CittaNome = entity.Citta?.Nome
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[GetByIdAsync] Errore: {ex.Message}");
                return null;
            }
        }

        public async Task<Guid> CreateAsync(SquadraCreateDto dto)
        {
            try
            {
                var entity = new Squadra
                {
                    Id = Guid.NewGuid(),
                    Nome = dto.Nome,
                    LogoUrl = dto.LogoUrl,
                    Stadio = dto.Stadio,
                    ColoreMaglia = dto.ColoreMaglia,
                    CittaId = dto.CittaId
                };

                _context.Squadre.Add(entity);
                await _context.SaveChangesAsync();
                return entity.Id;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[CreateAsync] Errore: {ex.Message}");
                return Guid.Empty;
            }
        }

        public async Task<bool> UpdateAsync(SquadraUpdateDto dto)
        {
            try
            {
                var entity = await _context.Squadre.FindAsync(dto.Id);
                if (entity == null) return false;

                entity.Nome = dto.Nome;
                entity.LogoUrl = dto.LogoUrl;
                entity.Stadio = dto.Stadio;
                entity.ColoreMaglia = dto.ColoreMaglia;
                entity.CittaId = dto.CittaId;

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[UpdateAsync] Errore: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                var entity = await _context.Squadre.FindAsync(id);
                if (entity == null) return false;

                _context.Squadre.Remove(entity);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[DeleteAsync] Errore: {ex.Message}");
                return false;
            }
        }
    }
}
