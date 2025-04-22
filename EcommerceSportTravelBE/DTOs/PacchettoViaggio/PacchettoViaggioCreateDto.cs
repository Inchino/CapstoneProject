namespace EcommerceSportTravelBE.DTOs.PacchettoViaggio
{
    using EcommerceSportTravelBE.Models;
    using System.ComponentModel.DataAnnotations;

    public class PacchettoViaggioCreateDto
    {
        [Required]
        [MaxLength(100)]
        public string Titolo { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Descrizione { get; set; }

        [Required]
        public decimal Prezzo { get; set; }

        [Required]
        public DurataPacchetto Durata { get; set; }

        [Required]
        public string ImmagineUrl { get; set; }

        [Required]
        public Guid PartitaId { get; set; }

        [Required]
        public Guid CittaId { get; set; }

        public bool Disponibile { get; set; } = true;
    }


}
