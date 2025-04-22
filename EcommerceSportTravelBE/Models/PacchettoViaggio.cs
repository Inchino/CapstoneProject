using EcommerceSportTravelBE.Models;
using System.ComponentModel.DataAnnotations;

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
    public string ImmagineUrl { get; set; }

    [Required]
    public DurataPacchetto Durata { get; set; }

    public bool Disponibile { get; set; }

    public Guid PartitaId { get; set; }
    public Guid CittaId { get; set; }

    public Partita Partita { get; set; }
    public Citta Citta { get; set; }

    public ICollection<Prenotazione> Prenotazioni { get; set; } = new List<Prenotazione>();
}
