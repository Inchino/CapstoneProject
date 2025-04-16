namespace EcommerceSportTravelBE.DTOs.Prenotazione
{
    public class PrenotazioneListDto
    {
        public Guid Id { get; set; }
        public DateTime DataPrenotazione { get; set; }
        public decimal PrezzoPagato { get; set; }

        public string TitoloPacchetto { get; set; }
        public string CittaNome { get; set; }
    }

}
