using System.ComponentModel.DataAnnotations;

public class SquadraListDto
{
    public Guid Id { get; set; }
    public string Nome { get; set; }
    public string CittaNome { get; set; }
    public string LogoUrl { get; set; }
}
