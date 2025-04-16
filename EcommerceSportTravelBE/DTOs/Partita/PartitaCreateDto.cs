using System.ComponentModel.DataAnnotations;

namespace EcommerceSportTravelBE.DTOs.Partita
{
    public class PartitaCreateDto
    {
        [Required]
        public DateTime DataPartita { get; set; }

        [Required]
        public Guid SquadraCasaId { get; set; }

        [Required]
        public Guid SquadraOspiteId { get; set; }

        [Required]
        public Guid CittaId { get; set; }

        [MaxLength(100)]
        public string? Stadio { get; set; }
    }

}
