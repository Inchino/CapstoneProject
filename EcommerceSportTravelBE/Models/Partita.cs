using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceSportTravelBE.Models
{
    public class Partita
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public DateTime DataPartita { get; set; }

        [Required]
        [MaxLength(100)]
        public string Stadio { get; set; }

        [Required]
        public Guid SquadraCasaId { get; set; }

        [Required]
        public Guid SquadraOspiteId { get; set; }

        [Required]
        public Guid CittaId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Campionato { get; set; }

        public Squadra SquadraCasa { get; set; }
        public Squadra SquadraOspite { get; set; }
        public Citta Citta { get; set; }

        public ICollection<PacchettoViaggio> Pacchetti { get; set; } = new List<PacchettoViaggio>();
    }
}
