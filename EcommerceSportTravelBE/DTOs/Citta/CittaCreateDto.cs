using System.ComponentModel.DataAnnotations;

namespace EcommerceSportTravelBE.DTOs.Citta
{
    public class CittaCreateDto
    {
        [Required]
        [MaxLength(100)]
        public string Nome { get; set; }

        [MaxLength(100)]
        public string? Regione { get; set; }

        [MaxLength(500)]
        public string? DescrizioneTuristica { get; set; }
    }


}
