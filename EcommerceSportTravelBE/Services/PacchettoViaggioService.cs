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

        public async Task<List<PacchettoViaggioListDto>> GetAllAsync()
        {
            return await _context.PacchettiViaggio
                .Include(p => p.Citta)
                .Select(p => new PacchettoViaggioListDto
                {
                    Id = p.Id,
                    Titolo = p.Titolo,
                    Prezzo = p.Prezzo,
                    DurataInGiorni = (int)p.Durata,
                    CittaNome = p.Citta.Nome,
                    Disponibile = p.Disponibile
                })
                .ToListAsync();
        }

        public async Task<PacchettoViaggioReadDto?> GetByIdAsync(Guid id)
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
                Disponibile = entity.Disponibile
            };
        }

        public async Task<Guid> CreateAsync(PacchettoViaggioCreateDto dto)
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
                Disponibile = dto.Disponibile
            };

            _context.PacchettiViaggio.Add(entity);
            await _context.SaveChangesAsync();
            return entity.Id;
        }

        public async Task<bool> UpdateAsync(PacchettoViaggioUpdateDto dto)
        {
            var entity = await _context.PacchettiViaggio.FindAsync(dto.Id);
            if (entity == null) return false;

            entity.Titolo = dto.Titolo;
            entity.Descrizione = dto.Descrizione;
            entity.Prezzo = dto.Prezzo;
            entity.Durata = dto.Durata;
            entity.PartitaId = dto.PartitaId;
            entity.CittaId = dto.CittaId;
            entity.Disponibile = dto.Disponibile;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await _context.PacchettiViaggio.FindAsync(id);
            if (entity == null) return false;

            _context.PacchettiViaggio.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
