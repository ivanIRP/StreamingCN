using Microsoft.AspNetCore.Mvc;
using MoviesWeb.Models;
using MoviesWeb.Services;

namespace MoviesWeb.Controllers
{
    public class PeliculasController : Controller
    {
        private readonly ApiService _apiService;
        public PeliculasController(ApiService apiService) => _apiService = apiService;

        public async Task<IActionResult> Index() => View(await _apiService.GetPeliculasAsync());

        public IActionResult Create() => View();

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Pelicula pelicula)
        {
            if (ModelState.IsValid)
            {
                if (await _apiService.CreatePeliculaAsync(pelicula))
                {
                    TempData["Success"] = "Película agregada exitosamente";
                    return RedirectToAction(nameof(Index));
                }
                ModelState.AddModelError("", "Error al agregar");
            }
            return View(pelicula);
        }

        public async Task<IActionResult> Edit(int id)
        {
            var pelicula = await _apiService.GetPeliculaAsync(id);
            if (pelicula == null) return NotFound();
            return View(pelicula);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Pelicula pelicula)
        {
            if (id != pelicula.Id) return BadRequest();
            if (ModelState.IsValid)
            {
                if (await _apiService.UpdatePeliculaAsync(pelicula))
                {
                    TempData["Success"] = "Película actualizada";
                    return RedirectToAction(nameof(Index));
                }
                ModelState.AddModelError("", "Error al actualizar");
            }
            return View(pelicula);
        }

        public async Task<IActionResult> Delete(int id)
        {
            var pelicula = await _apiService.GetPeliculaAsync(id);
            if (pelicula == null) return NotFound();
            return View(pelicula);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (await _apiService.DeletePeliculaAsync(id))
                TempData["Success"] = "Película eliminada";
            else
                TempData["Error"] = "Error al eliminar";
            return RedirectToAction(nameof(Index));
        }
    }

    public class HomeController : Controller
    {
        private readonly ApiService _apiService;
        public HomeController(ApiService apiService) => _apiService = apiService;

        public async Task<IActionResult> Index()
        {
            ViewBag.Peliculas = await _apiService.GetPeliculasAsync();
            return View();
        }
    }
}
