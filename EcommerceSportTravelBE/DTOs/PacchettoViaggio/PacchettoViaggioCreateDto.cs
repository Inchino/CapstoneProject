namespace EcommerceSportTravelBE.DTOs.PacchettoViaggio
{
    public class PacchettoViaggioCreateDto
    {
        public string Titolo { get; set; }
        public string Descrizione { get; set; }
        public decimal Prezzo { get; set; }
        public Guid PartitaId { get; set; }
        public Guid CittaId { get; set; }
    }

}
