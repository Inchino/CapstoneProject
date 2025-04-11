namespace EcommerceSportTravelBE.DTOs.Account
{
    public class GetRoleResponseDto
    {
        public required string Message { get; set; }
        public required List<RoleDto>? Role { get; set; }

    }
}
