using System.ComponentModel.DataAnnotations;

namespace EcommerceSportTravelBE.DTOs.Prenotazione
{
    public class PrenotazioneCreateDto
    {
        [Required]
        public Guid PacchettoViaggioId { get; set; }

        [Required]
        public decimal PrezzoPagato { get; set; }

    }

}
