using EcommerceSportTravelBE.Models;
using System.ComponentModel.DataAnnotations;

public class Squadra
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nome { get; set; }

    [Required]
    public string LogoUrl { get; set; }

    [Required]
    [MaxLength(100)]
    public string Stadio { get; set; }

    [Required]
    [MaxLength(50)]
    public string ColoreMaglia { get; set; }

    public Guid CittaId { get; set; }
    public Citta Citta { get; set; }

    public ICollection<Partita> PartiteCasa { get; set; } = new List<Partita>();
    public ICollection<Partita> PartiteOspite { get; set; } = new List<Partita>();
}
