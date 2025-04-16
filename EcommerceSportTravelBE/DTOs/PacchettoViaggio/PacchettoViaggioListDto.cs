namespace EcommerceSportTravelBE.DTOs.PacchettoViaggio
{
    public class PacchettoViaggioListDto
    {
        public Guid Id { get; set; }
        public string Titolo { get; set; }
        public decimal Prezzo { get; set; }
        public int DurataInGiorni { get; set; }
        public string CittaNome { get; set; }
        public bool Disponibile { get; set; }
    }

}
