namespace EcommerceSportTravelBE.Settings
{
    public class JwtSettings
    {
        public required string SecurityKey { get; set; }
        public required string Issuer { get; set; }
        public required string Audience { get; set; }
        public required int ExpiresInMinutes { get; set; }
    }
}
