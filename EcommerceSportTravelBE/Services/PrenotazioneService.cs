using EcommerceSportTravelBE.Data;
using EcommerceSportTravelBE.DTOs.Prenotazione;
using EcommerceSportTravelBE.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EcommerceSportTravelBE.Services
{
    public class PrenotazioneService
    {
        private readonly EcommerceDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public PrenotazioneService(EcommerceDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<List<PrenotazioneListDto>> GetAllByUserAsync(string userId)
        {
            try
            {
                return await _context.Prenotazioni
                    .Include(p => p.PacchettoViaggio)
                        .ThenInclude(pv => pv.Citta)
                    .Where(p => p.UserId == userId)
                    .Select(p => new PrenotazioneListDto
                    {
                        Id = p.Id,
                        DataPrenotazione = p.DataPrenotazione,
                        PrezzoPagato = p.PrezzoPagato,
                        TitoloPacchetto = p.PacchettoViaggio.Titolo,
                        CittaNome = p.PacchettoViaggio.Citta.Nome,
                        MetodoPagamento = p.MetodoPagamento,
                        StatoPrenotazione = p.StatoPrenotazione,
                        NumeroPartecipanti = p.NumeroPartecipanti
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[GetAllByUserAsync] Errore: {ex.Message}");
                return new List<PrenotazioneListDto>();
            }
        }

        public async Task<PrenotazioneReadDto?> GetByIdAsync(Guid id)
        {
            try
            {
                var entity = await _context.Prenotazioni
                    .Include(p => p.User)
                    .Include(p => p.PacchettoViaggio)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (entity == null) return null;

                return new PrenotazioneReadDto
                {
                    Id = entity.Id,
                    DataPrenotazione = entity.DataPrenotazione,
                    PrezzoPagato = entity.PrezzoPagato,
                    UserId = entity.UserId,
                    EmailUtente = entity.User.Email,
                    PacchettoViaggioId = entity.PacchettoViaggioId,
                    TitoloPacchetto = entity.PacchettoViaggio.Titolo,
                    MetodoPagamento = entity.MetodoPagamento,
                    StatoPrenotazione = entity.StatoPrenotazione,
                    NumeroPartecipanti = entity.NumeroPartecipanti
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[GetByIdAsync] Errore: {ex.Message}");
                return null;
            }
        }

        public async Task<Guid?> CreateAsync(PrenotazioneCreateDto dto, ClaimsPrincipal userPrincipal)
        {
            try
            {
                var user = await _userManager.GetUserAsync(userPrincipal);
                if (user == null) return null;

                var entity = new Prenotazione
                {
                    Id = Guid.NewGuid(),
                    DataPrenotazione = DateTime.UtcNow,
                    PrezzoPagato = dto.PrezzoPagato,
                    UserId = user.Id,
                    PacchettoViaggioId = dto.PacchettoViaggioId,
                    MetodoPagamento = dto.MetodoPagamento,
                    StatoPrenotazione = dto.StatoPrenotazione,
                    NumeroPartecipanti = dto.NumeroPartecipanti
                };

                _context.Prenotazioni.Add(entity);
                await _context.SaveChangesAsync();
                return entity.Id;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[CreateAsync] Errore: {ex.Message}");
                return null;
            }
        }

        public async Task<bool> UpdateAsync(PrenotazioneUpdateDto dto)
        {
            try
            {
                var entity = await _context.Prenotazioni.FindAsync(dto.Id);
                if (entity == null) return false;

                entity.PrezzoPagato = dto.PrezzoPagato;
                entity.PacchettoViaggioId = dto.PacchettoViaggioId;
                entity.MetodoPagamento = dto.MetodoPagamento;
                entity.StatoPrenotazione = dto.StatoPrenotazione;
                entity.NumeroPartecipanti = dto.NumeroPartecipanti;

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
                var entity = await _context.Prenotazioni.FindAsync(id);
                if (entity == null) return false;

                _context.Prenotazioni.Remove(entity);
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
