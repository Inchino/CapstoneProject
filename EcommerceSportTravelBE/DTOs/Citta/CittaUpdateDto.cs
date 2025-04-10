namespace EcommerceSportTravelBE.DTOs.Citta
{
    public class CittaUpdateDto
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string? Regione { get; set; }
        public string? DescrizioneTuristica { get; set; }
    }

}
