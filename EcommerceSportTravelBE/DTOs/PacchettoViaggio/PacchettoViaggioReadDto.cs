using EcommerceSportTravelBE.Models;

namespace EcommerceSportTravelBE.DTOs.PacchettoViaggio
{
    public class PacchettoViaggioReadDto
    {
        public Guid Id { get; set; }
        public string Titolo { get; set; }
        public string Descrizione { get; set; }
        public decimal Prezzo { get; set; }
        public DurataPacchetto Durata { get; set; }
        public string ImmagineUrl { get; set; }

        public Guid PartitaId { get; set; }
        public string PartitaDescrizione { get; set; }

        public Guid CittaId { get; set; }
        public string CittaNome { get; set; }

        public bool Disponibile { get; set; }
    }

}
