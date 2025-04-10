namespace EcommerceSportTravelBE.DTOs.Prenotazione
{
    public class PrenotazioneUpdateDto
    {
        public Guid Id { get; set; }
        public Guid PacchettoViaggioId { get; set; }
        public decimal PrezzoPagato { get; set; }
    }

}
