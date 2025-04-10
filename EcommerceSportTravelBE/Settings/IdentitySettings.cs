namespace EcommerceSportTravelBE.Settings
{
    public class IdentitySettings
    {
        public required bool SignInRequireConfirmedAccount { get; set; }
        public required int RequiredLength { get; set; }
        public required bool RequireDigit { get; set; }
        public required bool RequireLowercase { get; set; }
        public required bool RequireNonAlphanumeric { get; set; }
        public required bool RequireUppercase { get; set; }
    }
}
