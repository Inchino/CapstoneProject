namespace EcommerceSportTravelBE.DTOs.Partita
{
    public class PartitaCreateDto
    {
        public Guid SquadraCasaId { get; set; }
        public Guid SquadraOspiteId { get; set; }
        public Guid CittaId { get; set; }
        public DateTime DataPartita { get; set; }
        public string? Stadio { get; set; }
    }

}
