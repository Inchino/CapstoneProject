using System.ComponentModel.DataAnnotations;

namespace EcommerceSportTravelBE.DTOs.Partita
{
    public class PartitaUpdateDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public DateTime DataPartita { get; set; }

        [Required]
        public Guid SquadraCasaId { get; set; }

        [Required]
        public Guid SquadraOspiteId { get; set; }

        [Required]
        public Guid CittaId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Stadio { get; set; }

        [Required]
        [MaxLength(50)]
        public string Campionato { get; set; }
    }


}
