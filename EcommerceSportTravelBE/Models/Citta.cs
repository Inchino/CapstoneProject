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

        [Required]
        [MaxLength(100)]
        public string Regione { get; set; }

        [Required]
        [MaxLength(500)]
        public string DescrizioneTuristica { get; set; }

        [Required]
        [Url]
        public string ImmagineUrl { get; set; }

        public ICollection<Partita> Partite { get; set; } = new List<Partita>();
        public ICollection<PacchettoViaggio> Pacchetti { get; set; } = new List<PacchettoViaggio>();
    }
}
