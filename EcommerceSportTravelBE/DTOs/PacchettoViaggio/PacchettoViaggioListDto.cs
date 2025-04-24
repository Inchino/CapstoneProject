namespace EcommerceSportTravelBE.DTOs.PacchettoViaggio
{
    public class PacchettoViaggioListDto
    {
        public Guid Id { get; set; }
        public string Titolo { get; set; }
        public string Descrizione { get; set; }
        public decimal Prezzo { get; set; }
        public string ImmagineUrl { get; set; }
        public int DurataInGiorni { get; set; }
        public bool Disponibile { get; set; }
        public string PartitaDescrizione { get; set; }
        public string CittaNome { get; set; }
    }

}
