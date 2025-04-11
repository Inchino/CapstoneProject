using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EcommerceSportTravelBE.Models
{
    public class PacchettoViaggio
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Titolo { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Descrizione { get; set; }

        [Required]
        public decimal Prezzo { get; set; }

        [Required]
        [ForeignKey("Partita")]
        public Guid PartitaId { get; set; }

        [Required]
        [ForeignKey("Citta")]
        public Guid CittaId { get; set; }

        [Required]
        public DurataPacchetto Durata { get; set; }

        public bool Disponibile { get; set; }

        public Partita Partita { get; set; }
        public Citta Citta { get; set; }

        public ICollection<Prenotazione> Prenotazioni { get; set; }
    }
}
