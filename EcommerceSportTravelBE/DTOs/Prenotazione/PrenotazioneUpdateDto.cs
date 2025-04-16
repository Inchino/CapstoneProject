using System.ComponentModel.DataAnnotations;

namespace EcommerceSportTravelBE.DTOs.Prenotazione
{
    public class PrenotazioneUpdateDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public decimal PrezzoPagato { get; set; }

        [Required]
        public Guid PacchettoViaggioId { get; set; }
    }

}
