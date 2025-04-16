using EcommerceSportTravelBE.Data;
using EcommerceSportTravelBE.DTOs.Citta;
using EcommerceSportTravelBE.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceSportTravelBE.Services
{
    public class CittaService
    {
        private readonly EcommerceDbContext _context;

        public CittaService(EcommerceDbContext context)
        {
            _context = context;
        }

        public async Task<List<CittaListDto>> GetAllAsync()
        {
            return await _context.Citta
                .Select(c => new CittaListDto
                {
                    Id = c.Id,
                    Nome = c.Nome,
                    Regione = c.Regione
                })
                .ToListAsync();
        }

        public async Task<CittaReadDto?> GetByIdAsync(Guid id)
        {
            var entity = await _context.Citta
                .Include(c => c.Partite)
                .Include(c => c.Pacchetti)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (entity == null) return null;

            return new CittaReadDto
            {
                Id = entity.Id,
                Nome = entity.Nome,
                Regione = entity.Regione,
                DescrizioneTuristica = entity.DescrizioneTuristica,
                NumeroPartite = entity.Partite.Count,
                NumeroPacchetti = entity.Pacchetti.Count
            };
        }

        public async Task<Guid> CreateAsync(CittaCreateDto dto)
        {
            var entity = new Citta
            {
                Id = Guid.NewGuid(),
                Nome = dto.Nome,
                Regione = dto.Regione,
                DescrizioneTuristica = dto.DescrizioneTuristica
            };

            _context.Citta.Add(entity);
            await _context.SaveChangesAsync();
            return entity.Id;
        }

        public async Task<bool> UpdateAsync(CittaUpdateDto dto)
        {
            var entity = await _context.Citta.FindAsync(dto.Id);
            if (entity == null) return false;

            entity.Nome = dto.Nome;
            entity.Regione = dto.Regione;
            entity.DescrizioneTuristica = dto.DescrizioneTuristica;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await _context.Citta.FindAsync(id);
            if (entity == null) return false;

            _context.Citta.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
