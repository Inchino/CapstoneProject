namespace EcommerceSportTravelBE.DTOs.Citta
{
    public class CittaReadDto
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Regione { get; set; }
        public string DescrizioneTuristica { get; set; }
        public string ImmagineUrl { get; set; }

        // dettagli extra
        public int NumeroPartite { get; set; }
        public int NumeroPacchetti { get; set; }
    }

}
