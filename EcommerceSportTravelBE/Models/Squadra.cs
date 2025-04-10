using System.ComponentModel.DataAnnotations;

namespace EcommerceSportTravelBE.Models
{
    public class Squadra
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nome { get; set; }

        [MaxLength(200)]
        public string? LogoUrl { get; set; }

        [MaxLength(100)]
        public string? Stadio { get; set; }

        [MaxLength(50)]
        public string? ColoreMaglia { get; set; }

        public ICollection<Partita> PartiteCasa { get; set; }
        public ICollection<Partita> PartiteOspite { get; set; }
    }
}
