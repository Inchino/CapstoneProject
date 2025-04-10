namespace EcommerceSportTravelBE.DTOs.Partita
{
    public class PartitaGetDto
    {
        public Guid Id { get; set; }
        public string SquadraCasa { get; set; }
        public string SquadraOspite { get; set; }
        public string Citta { get; set; }
        public DateTime DataPartita { get; set; }
        public string? Stadio { get; set; }
    }

}
