namespace EcommerceSportTravelBE.DTOs.Prenotazione
{
    public class PrenotazioneListDto
    {
        public Guid Id { get; set; }
        public DateTime DataPrenotazione { get; set; }
        public decimal PrezzoPagato { get; set; }
        public string TitoloPacchetto { get; set; }
        public string CittaNome { get; set; }
        public int NumeroPartecipanti { get; set; }
        public string StatoPrenotazione { get; set; }
        public string NomeUtente { get; set; }
        public string MetodoPagamento { get; set; }
    }

}
