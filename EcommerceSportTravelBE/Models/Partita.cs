using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EcommerceSportTravelBE.Models
{
    public class Partita
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public DateTime DataPartita { get; set; }

        [Required]
        [ForeignKey("SquadraCasa")]
        public Guid SquadraCasaId { get; set; }

        [Required]
        [ForeignKey("SquadraOspite")]
        public Guid SquadraOspiteId { get; set; }

        [Required]
        [ForeignKey("Citta")]
        public Guid CittaId { get; set; }

        [MaxLength(100)]
        public string? Stadio { get; set; }

        public Squadra SquadraCasa { get; set; }
        public Squadra SquadraOspite { get; set; }
        public Citta Citta { get; set; }

        public ICollection<PacchettoViaggio> Pacchetti { get; set; }
    }
}
