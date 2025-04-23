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

        public async Task<List<CittaListDto>> GetAllAsync(int page = 0, int pageSize = 10)
        {
            try
            {
                return await _context.Citta
                    .Skip(page * pageSize)
                    .Take(pageSize)
                    .Select(c => new CittaListDto
                    {
                        Id = c.Id,
                        Nome = c.Nome,
                        Regione = c.Regione,
                        ImmagineUrl = c.ImmagineUrl
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[GetAllAsync] Errore: {ex.Message}");
                return new List<CittaListDto>();
            }
        }

        public async Task<CittaReadDto?> GetByIdAsync(Guid id)
        {
            try
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
                    NumeroPacchetti = entity.Pacchetti.Count,
                    ImmagineUrl = entity.ImmagineUrl
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[GetByIdAsync] Errore: {ex.Message}");
                return null;
            }
        }

        public async Task<Guid> CreateAsync(CittaCreateDto dto)
        {
            try
            {
                // Verifica se la città esiste già
                var existingCity = await _context.Citta
                    .FirstOrDefaultAsync(c => c.Nome == dto.Nome);
                if (existingCity != null)
                {
                    throw new InvalidOperationException("Città già esistente.");
                }

                var entity = new Citta
                {
                    Id = Guid.NewGuid(),
                    Nome = dto.Nome,
                    Regione = dto.Regione,
                    DescrizioneTuristica = dto.DescrizioneTuristica,
                    ImmagineUrl = dto.ImmagineUrl
                };

                _context.Citta.Add(entity);
                await _context.SaveChangesAsync();
                return entity.Id;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[CreateAsync] Errore: {ex.Message}");
                return Guid.Empty;
            }
        }

        public async Task<bool> UpdateAsync(CittaUpdateDto dto)
        {
            try
            {
                var entity = await _context.Citta.FindAsync(dto.Id);
                if (entity == null) return false;

                var existingCity = await _context.Citta
                    .FirstOrDefaultAsync(c => c.Nome == dto.Nome && c.Id != dto.Id);
                if (existingCity != null)
                {
                    throw new InvalidOperationException("Città con lo stesso nome esistente.");
                }

                entity.Nome = dto.Nome;
                entity.Regione = dto.Regione;
                entity.DescrizioneTuristica = dto.DescrizioneTuristica;
                entity.ImmagineUrl = dto.ImmagineUrl;

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
                var entity = await _context.Citta.FindAsync(id);
                if (entity == null) return false;

                _context.Citta.Remove(entity);
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
