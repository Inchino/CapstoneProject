using EcommerceSportTravelBE.Data;
using EcommerceSportTravelBE.DTOs.Partita;
using EcommerceSportTravelBE.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceSportTravelBE.Services
{
    public class PartitaService
    {
        private readonly EcommerceDbContext _context;

        public PartitaService(EcommerceDbContext context)
        {
            _context = context;
        }

        public async Task<List<PartitaListDto>> GetAllAsync()
        {
            return await _context.Partite
                .Include(p => p.SquadraCasa)
                .Include(p => p.SquadraOspite)
                .Include(p => p.Citta)
                .Select(p => new PartitaListDto
                {
                    Id = p.Id,
                    DataPartita = p.DataPartita,
                    SquadraCasaNome = p.SquadraCasa.Nome,
                    SquadraOspiteNome = p.SquadraOspite.Nome,
                    CittaNome = p.Citta.Nome
                })
                .ToListAsync();
        }

        public async Task<PartitaReadDto?> GetByIdAsync(Guid id)
        {
            var partita = await _context.Partite
                .Include(p => p.SquadraCasa)
                .Include(p => p.SquadraOspite)
                .Include(p => p.Citta)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (partita == null) return null;

            return new PartitaReadDto
            {
                Id = partita.Id,
                DataPartita = partita.DataPartita,
                SquadraCasaId = partita.SquadraCasaId,
                SquadraCasaNome = partita.SquadraCasa.Nome,
                SquadraOspiteId = partita.SquadraOspiteId,
                SquadraOspiteNome = partita.SquadraOspite.Nome,
                CittaId = partita.CittaId,
                CittaNome = partita.Citta.Nome,
                Stadio = partita.Stadio
            };
        }

        public async Task<Guid> CreateAsync(PartitaCreateDto dto)
        {
            var entity = new Partita
            {
                Id = Guid.NewGuid(),
                DataPartita = dto.DataPartita,
                SquadraCasaId = dto.SquadraCasaId,
                SquadraOspiteId = dto.SquadraOspiteId,
                CittaId = dto.CittaId,
                Stadio = dto.Stadio
            };

            _context.Partite.Add(entity);
            await _context.SaveChangesAsync();
            return entity.Id;
        }

        public async Task<bool> UpdateAsync(PartitaUpdateDto dto)
        {
            var entity = await _context.Partite.FindAsync(dto.Id);
            if (entity == null) return false;

            entity.DataPartita = dto.DataPartita;
            entity.SquadraCasaId = dto.SquadraCasaId;
            entity.SquadraOspiteId = dto.SquadraOspiteId;
            entity.CittaId = dto.CittaId;
            entity.Stadio = dto.Stadio;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await _context.Partite.FindAsync(id);
            if (entity == null) return false;

            _context.Partite.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
