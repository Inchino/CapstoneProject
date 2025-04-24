using EcommerceSportTravelBE.Data;
using EcommerceSportTravelBE.DTOs.PacchettoViaggio;
using EcommerceSportTravelBE.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceSportTravelBE.Services
{
    public class PacchettoViaggioService
    {
        private readonly EcommerceDbContext _context;

        public PacchettoViaggioService(EcommerceDbContext context)
        {
            _context = context;
        }

        public async Task<List<PacchettoViaggioListDto>> GetAllAsync(int page = 0, int pageSize = 10)
        {
            try
            {
                return await _context.PacchettiViaggio
                    .Skip(page * pageSize)
                    .Take(pageSize)
                    .Include(p => p.Partita)
                        .ThenInclude(pa => pa.SquadraCasa)
                    .Include(p => p.Partita)
                        .ThenInclude(pa => pa.SquadraOspite)
                    .Include(p => p.Citta)
                    .Select(p => new PacchettoViaggioListDto
                    {
                        Id = p.Id,
                        Titolo = p.Titolo,
                        Descrizione = p.Descrizione,
                        Prezzo = p.Prezzo,
                        DurataInGiorni = (int)p.Durata,
                        CittaNome = p.Citta.Nome,
                        PartitaDescrizione = $"{p.Partita.SquadraCasa.Nome} vs {p.Partita.SquadraOspite.Nome} - {p.Partita.DataPartita:dd/MM/yyyy}",
                        ImmagineUrl = p.ImmagineUrl,
                        Disponibile = p.Disponibile
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[GetAllAsync] Errore: {ex.Message}");
                return new List<PacchettoViaggioListDto>();
            }
        }

        public async Task<PacchettoViaggioReadDto?> GetByIdAsync(Guid id)
        {
            try
            {
                var entity = await _context.PacchettiViaggio
                    .Include(p => p.Partita)
                        .ThenInclude(pa => pa.SquadraCasa)
                    .Include(p => p.Partita)
                        .ThenInclude(pa => pa.SquadraOspite)
                    .Include(p => p.Citta)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (entity == null) return null;

                return new PacchettoViaggioReadDto
                {
                    Id = entity.Id,
                    Titolo = entity.Titolo,
                    Descrizione = entity.Descrizione,
                    Prezzo = entity.Prezzo,
                    Durata = entity.Durata,
                    PartitaId = entity.PartitaId,
                    PartitaDescrizione = $"{entity.Partita.SquadraCasa.Nome} vs {entity.Partita.SquadraOspite.Nome} - {entity.Partita.DataPartita:dd/MM/yyyy}",
                    CittaId = entity.CittaId,
                    CittaNome = entity.Citta.Nome,
                    ImmagineUrl = entity.ImmagineUrl,
                    Disponibile = entity.Disponibile
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[GetByIdAsync] Errore: {ex.Message}");
                return null;
            }
        }

        public async Task<Guid> CreateAsync(PacchettoViaggioCreateDto dto)
        {
            try
            {
                var entity = new PacchettoViaggio
                {
                    Id = Guid.NewGuid(),
                    Titolo = dto.Titolo,
                    Descrizione = dto.Descrizione,
                    Prezzo = dto.Prezzo,
                    Durata = dto.Durata,
                    PartitaId = dto.PartitaId,
                    CittaId = dto.CittaId,
                    ImmagineUrl = dto.ImmagineUrl,
                    Disponibile = dto.Disponibile
                };

                _context.PacchettiViaggio.Add(entity);
                await _context.SaveChangesAsync();
                return entity.Id;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[CreateAsync] Errore: {ex.Message}");
                return Guid.Empty;
            }
        }

        public async Task<bool> UpdateAsync(PacchettoViaggioUpdateDto dto)
        {
            try
            {
                var entity = await _context.PacchettiViaggio.FindAsync(dto.Id);
                if (entity == null) return false;

                entity.Titolo = dto.Titolo;
                entity.Descrizione = dto.Descrizione;
                entity.Prezzo = dto.Prezzo;
                entity.Durata = dto.Durata;
                entity.PartitaId = dto.PartitaId;
                entity.CittaId = dto.CittaId;
                entity.ImmagineUrl = dto.ImmagineUrl;
                entity.Disponibile = dto.Disponibile;

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
                var entity = await _context.PacchettiViaggio.FindAsync(id);
                if (entity == null) return false;

                _context.PacchettiViaggio.Remove(entity);
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
