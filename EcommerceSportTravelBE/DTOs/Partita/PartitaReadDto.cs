using System.ComponentModel.DataAnnotations;

namespace EcommerceSportTravelBE.DTOs.Partita
{
    public class PartitaReadDto
    {
        public Guid Id { get; set; }
        public DateTime DataPartita { get; set; }

        public Guid SquadraCasaId { get; set; }
        public string SquadraCasaNome { get; set; }

        public Guid SquadraOspiteId { get; set; }
        public string SquadraOspiteNome { get; set; }

        public Guid CittaId { get; set; }
        public string CittaNome { get; set; }

        public string Stadio { get; set; }

        public string Campionato { get; set; }
    }

}
