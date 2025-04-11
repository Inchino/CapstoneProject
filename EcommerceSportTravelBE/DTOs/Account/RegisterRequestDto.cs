namespace EcommerceSportTravelBE.DTOs.Account
{
    public class RegisterRequestDto
    {
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required DateOnly BirthDate { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; }
    }
}
