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

        public async Task<List<SquadraListDto>> GetAllAsync()
        {
            return await _context.Squadre
                .Include(s => s.Citta)
                .Select(s => new SquadraListDto
                {
                    Id = s.Id,
                    Nome = s.Nome,
                    CittaNome = s.Citta != null ? s.Citta.Nome : null
                })
                .ToListAsync();
        }

        public async Task<SquadraReadDto?> GetByIdAsync(Guid id)
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

        public async Task<Guid> CreateAsync(SquadraCreateDto dto)
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

        public async Task<bool> UpdateAsync(SquadraUpdateDto dto)
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

        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await _context.Squadre.FindAsync(id);
            if (entity == null) return false;

            _context.Squadre.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
