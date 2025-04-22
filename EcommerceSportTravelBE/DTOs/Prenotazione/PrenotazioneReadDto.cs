namespace EcommerceSportTravelBE.DTOs.Prenotazione
{
    public class PrenotazioneReadDto
    {
        public Guid Id { get; set; }
        public DateTime DataPrenotazione { get; set; }

        public decimal PrezzoPagato { get; set; }

        public string UserId { get; set; }
        public string EmailUtente { get; set; }

        public Guid PacchettoViaggioId { get; set; }
        public string TitoloPacchetto { get; set; }

        public int NumeroPartecipanti { get; set; }
        public string StatoPrenotazione { get; set; }
        public string MetodoPagamento { get; set; }
    }

}
