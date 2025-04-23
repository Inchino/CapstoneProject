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

        public async Task<List<PartitaListDto>> GetAllAsync(int page = 0, int pageSize = 10)
        {
            try
            {
                return await _context.Partite
                    .Skip(page * pageSize)
                    .Take(pageSize)
                    .Include(p => p.SquadraCasa)
                    .Include(p => p.SquadraOspite)
                    .Include(p => p.Citta)
                    .Select(p => new PartitaListDto
                    {
                        Id = p.Id,
                        DataPartita = p.DataPartita,
                        SquadraCasaNome = p.SquadraCasa.Nome,
                        SquadraOspiteNome = p.SquadraOspite.Nome,
                        CittaNome = p.Citta.Nome,
                        Stadio = p.Stadio,
                        Campionato = p.Campionato
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[GetAllAsync] Errore: {ex.Message}");
                return new List<PartitaListDto>();
            }
        }

        public async Task<PartitaReadDto?> GetByIdAsync(Guid id)
        {
            try
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
                    Stadio = partita.Stadio,
                    Campionato = partita.Campionato
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[GetByIdAsync] Errore: {ex.Message}");
                return null;
            }
        }

        public async Task<Guid> CreateAsync(PartitaCreateDto dto)
        {
            try
            {
                var entity = new Partita
                {
                    Id = Guid.NewGuid(),
                    DataPartita = dto.DataPartita,
                    SquadraCasaId = dto.SquadraCasaId,
                    SquadraOspiteId = dto.SquadraOspiteId,
                    CittaId = dto.CittaId,
                    Stadio = dto.Stadio,
                    Campionato = dto.Campionato
                };

                _context.Partite.Add(entity);
                await _context.SaveChangesAsync();
                return entity.Id;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[CreateAsync] Errore: {ex.Message}");
                return Guid.Empty;
            }
        }

        public async Task<bool> UpdateAsync(PartitaUpdateDto dto)
        {
            try
            {
                var entity = await _context.Partite.FindAsync(dto.Id);
                if (entity == null) return false;

                entity.DataPartita = dto.DataPartita;
                entity.SquadraCasaId = dto.SquadraCasaId;
                entity.SquadraOspiteId = dto.SquadraOspiteId;
                entity.CittaId = dto.CittaId;
                entity.Stadio = dto.Stadio;
                entity.Campionato = dto.Campionato;

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
                var entity = await _context.Partite.FindAsync(id);
                if (entity == null) return false;

                _context.Partite.Remove(entity);
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
