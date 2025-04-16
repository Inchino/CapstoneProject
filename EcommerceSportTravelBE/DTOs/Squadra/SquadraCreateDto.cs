using System.ComponentModel.DataAnnotations;

namespace EcommerceSportTravelBE.DTOs.Squadra
{
    public class SquadraCreateDto
    {
        [Required]
        [MaxLength(100)]
        public string Nome { get; set; }

        [MaxLength(200)]
        public string? LogoUrl { get; set; }

        [MaxLength(100)]
        public string? Stadio { get; set; }

        [MaxLength(50)]
        public string? ColoreMaglia { get; set; }

        public Guid? CittaId { get; set; } // Collegamento opzionale alla città
    }


}
