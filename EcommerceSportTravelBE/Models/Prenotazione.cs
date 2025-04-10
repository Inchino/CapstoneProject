using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EcommerceSportTravelBE.Models
{
    public class Prenotazione
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public DateTime DataPrenotazione { get; set; }

        [Required]
        public decimal PrezzoPagato { get; set; }

        [Required]
        [ForeignKey("User")]
        public string UserId { get; set; }

        [Required]
        [ForeignKey("PacchettoViaggio")]
        public Guid PacchettoViaggioId { get; set; }

        public ApplicationUser User { get; set; }
        public PacchettoViaggio PacchettoViaggio { get; set; }
    }
}
