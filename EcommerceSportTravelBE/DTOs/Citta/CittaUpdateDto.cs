using System.ComponentModel.DataAnnotations;

public class CittaUpdateDto
{
    [Required]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nome { get; set; }

    [Required]
    [MaxLength(100)]
    public string Regione { get; set; }

    [Required]
    [MaxLength(500)]
    public string DescrizioneTuristica { get; set; }

    [Required]
    [Url]
    public string ImmagineUrl { get; set; }
}
