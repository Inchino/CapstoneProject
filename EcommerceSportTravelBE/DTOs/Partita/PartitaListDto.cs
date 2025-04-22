using System.ComponentModel.DataAnnotations;

namespace EcommerceSportTravelBE.DTOs.Partita
{
    public class PartitaListDto
    {
        public Guid Id { get; set; }
        public DateTime DataPartita { get; set; }

        public string SquadraCasaNome { get; set; }
        public string SquadraOspiteNome { get; set; }

        public string CittaNome { get; set; }

        public string Stadio { get; set; }

        public string Campionato { get; set; }
    }

}
