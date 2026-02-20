using System.ComponentModel.DataAnnotations;

namespace MoviesWeb.Models
{
    public class Pelicula
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es requerido")]
        [Display(Name = "Nombre de la Película")]
        public string Nombre { get; set; } = string.Empty;

        [Required(ErrorMessage = "La sinopsis es requerida")]
        [Display(Name = "Sinopsis")]
        public string Sinopsis { get; set; } = string.Empty;

        [Required(ErrorMessage = "La categoría es requerida")]
        [Display(Name = "Categoría")]
        public string Categoria { get; set; } = string.Empty;

        [Required(ErrorMessage = "El año es requerido")]
        [Display(Name = "Año")]
        [Range(1900, 2100, ErrorMessage = "El año debe estar entre 1900 y 2100")]
        public int? Anio { get; set; }

        [Display(Name = "Link de la Película")]
        public string? LinkPelicula { get; set; }

        public DateTime FechaRegistro { get; set; }
    }
}