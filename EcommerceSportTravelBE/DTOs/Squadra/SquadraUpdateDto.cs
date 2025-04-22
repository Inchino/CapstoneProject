using System.ComponentModel.DataAnnotations;

namespace EcommerceSportTravelBE.DTOs.Squadra
{
    public class SquadraUpdateDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nome { get; set; }

        [Required]
        [Url]
        public string LogoUrl { get; set; }

        [Required]
        [MaxLength(100)]
        public string Stadio { get; set; }

        [Required]
        [MaxLength(50)]
        public string ColoreMaglia { get; set; }

        [Required]
        public Guid CittaId { get; set; }
    }

}
