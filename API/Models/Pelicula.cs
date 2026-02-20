using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoviesAPI.Models
{
    [Table("Peliculas")]
    public class Pelicula
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "text")]
        public string Sinopsis { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Categoria { get; set; } = string.Empty;

        [Range(1900, 2100, ErrorMessage = "El año debe estar entre 1900 y 2100")]
        public int? Anio { get; set; }

        [StringLength(500)]
        public string? LinkPelicula { get; set; }

        public DateTime FechaRegistro { get; set; } = DateTime.Now;
    }
}
