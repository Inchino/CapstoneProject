namespace EcommerceSportTravelBE.DTOs.Squadra
{
    public class SquadraUpdateDto
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string? LogoUrl { get; set; }
        public string? Stadio { get; set; }
        public string? ColoreMaglia { get; set; }
    }

}
