namespace EcommerceSportTravelBE.DTOs.PacchettoViaggio
{
    public class PacchettoViaggioUpdateDto
    {
        public Guid Id { get; set; }
        public string Titolo { get; set; }
        public string Descrizione { get; set; }
        public decimal Prezzo { get; set; }
        public bool Disponibile { get; set; }
        public Guid PartitaId { get; set; }
        public Guid CittaId { get; set; }
    }

}
