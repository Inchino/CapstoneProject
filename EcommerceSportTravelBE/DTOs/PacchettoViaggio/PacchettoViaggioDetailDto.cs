namespace EcommerceSportTravelBE.DTOs.PacchettoViaggio
{
    public class PacchettoViaggioDetailDto
    {
        public Guid Id { get; set; }
        public string Titolo { get; set; }
        public string Descrizione { get; set; }
        public decimal Prezzo { get; set; }
        public bool Disponibile { get; set; }
        public string Citta { get; set; }
        public string SquadraCasa { get; set; }
        public string SquadraOspite { get; set; }
        public DateTime DataPartita { get; set; }
    }

}
