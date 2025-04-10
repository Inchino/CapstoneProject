namespace EcommerceSportTravelBE.DTOs.Prenotazione
{
    public class PrenotazioneGetDto
    {
        public Guid Id { get; set; }
        public string TitoloPacchetto { get; set; }
        public DateTime DataPrenotazione { get; set; }
        public decimal PrezzoPagato { get; set; }
    }

}
