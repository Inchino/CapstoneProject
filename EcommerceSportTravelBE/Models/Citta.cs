using System.ComponentModel.DataAnnotations;

namespace EcommerceSportTravelBE.Models
{
    public class Citta
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nome { get; set; }

        [MaxLength(100)]
        public string? Regione { get; set; }

        [MaxLength(500)]
        public string? DescrizioneTuristica { get; set; }

        public ICollection<Partita> Partite { get; set; }
        public ICollection<PacchettoViaggio> Pacchetti { get; set; }
    }

}
