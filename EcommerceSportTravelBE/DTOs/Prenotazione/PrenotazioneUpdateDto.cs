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

        [Required]
        public DateTime DataPrenotazione { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        [Range(1, 10, ErrorMessage = "Il numero di partecipanti deve essere almeno 1 e massimo 10.")]
        public int NumeroPartecipanti { get; set; }

        [Required]
        [MaxLength(50)]
        public string StatoPrenotazione { get; set; }

        [Required]
        [MaxLength(50)]
        public string MetodoPagamento { get; set; }
    }

}
