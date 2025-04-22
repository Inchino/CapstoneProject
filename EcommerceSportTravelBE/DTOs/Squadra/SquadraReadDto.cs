namespace EcommerceSportTravelBE.DTOs.Squadra
{
    public class SquadraReadDto
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }

        public string LogoUrl { get; set; }
        public string Stadio { get; set; }
        public string ColoreMaglia { get; set; }

        public Guid CittaId { get; set; }
        public string CittaNome { get; set; }
    }

}
