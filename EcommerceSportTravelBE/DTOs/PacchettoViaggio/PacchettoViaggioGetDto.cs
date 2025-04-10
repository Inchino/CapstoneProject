namespace EcommerceSportTravelBE.DTOs.PacchettoViaggio
{
    public class PacchettoViaggioGetDto
    {
        public Guid Id { get; set; }
        public string Titolo { get; set; }
        public decimal Prezzo { get; set; }
        public bool Disponibile { get; set; }
    }

}
