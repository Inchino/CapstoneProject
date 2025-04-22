namespace EcommerceSportTravelBE.DTOs.Account
{
    public class GetUserResponseDto
    {
        public required string Message { get; set; }
        public required List<UserDto> User { get; set; } = new();
    }

}
