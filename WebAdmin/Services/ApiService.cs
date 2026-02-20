using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Text;
using MoviesWeb.Models;

namespace MoviesWeb.Services
{
    public class ApiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl;
        private readonly JsonSerializerSettings _jsonSettings;

        public ApiService(IConfiguration configuration)
        {
            _httpClient = new HttpClient();
            _baseUrl = configuration["ApiSettings:BaseUrl"] ?? "http://localhost:5000/api";
            _jsonSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
        }

        public async Task<List<Pelicula>> GetPeliculasAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_baseUrl}/Peliculas");
                response.EnsureSuccessStatusCode();
                var content = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<List<Pelicula>>(content) ?? new List<Pelicula>();
            }
            catch { return new List<Pelicula>(); }
        }

        public async Task<Pelicula?> GetPeliculaAsync(int id)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_baseUrl}/Peliculas/{id}");
                response.EnsureSuccessStatusCode();
                var content = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<Pelicula>(content);
            }
            catch { return null; }
        }

        public async Task<bool> CreatePeliculaAsync(Pelicula pelicula)
        {
            try
            {
                var json = JsonConvert.SerializeObject(pelicula, _jsonSettings);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var response = await _httpClient.PostAsync($"{_baseUrl}/Peliculas", content);
                return response.IsSuccessStatusCode;
            }
            catch { return false; }
        }

        public async Task<bool> UpdatePeliculaAsync(Pelicula pelicula)
        {
            try
            {
                var json = JsonConvert.SerializeObject(pelicula, _jsonSettings);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var response = await _httpClient.PutAsync($"{_baseUrl}/Peliculas/{pelicula.Id}", content);
                return response.IsSuccessStatusCode;
            }
            catch { return false; }
        }

        public async Task<bool> DeletePeliculaAsync(int id)
        {
            try
            {
                var response = await _httpClient.DeleteAsync($"{_baseUrl}/Peliculas/{id}");
                return response.IsSuccessStatusCode;
            }
            catch { return false; }
        }
    }
}