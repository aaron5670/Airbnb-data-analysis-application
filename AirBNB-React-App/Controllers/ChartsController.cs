using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirBNB_React_App.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AirBNB_React_App.Controllers
{
    [Authorize(Roles = "AdminUser")]
    [Route("api/[controller]")]
    [ApiController]
    public class ChartsController : ControllerBase
    {
        private readonly IChartsRepository _chartsRepository;
        
        public ChartsController(IChartsRepository chartsRepository)
        {
            _chartsRepository = chartsRepository;
        }
        
        [HttpGet("review")]
        public async Task<IEnumerable<Chart>> GetReviewInfoChart()
        {
            var data = await _chartsRepository.GetReviewInfoChart();
            return data.OrderBy(chart => chart.Numbers);
        }
        
        [HttpGet("chart/availability")]
        public async Task<IEnumerable<Chart>> GetAvailabilityInfoChart()
        {
            var data = await _chartsRepository.GetAvailabilityInfoChart();
            return data.OrderBy(chart => chart.Numbers);
        }
        
        [HttpGet("average-price")]
        public async Task<IEnumerable<NeighbourhoodChart>> GetAveragePriceNeighbourhoodInfoChart()
        {
            var data = await _chartsRepository.GetAveragePriceNeighbourhoodInfoChart();
            return data;
        }

        [HttpGet("type-accommodations")]
        public async Task<IEnumerable<TypeAccommodation>> GetTypeAccommodation()
        {
            var data = await _chartsRepository.GetTypeAccommodations();
            return data;
        }        
        
        [HttpGet("type-rooms")]
        public async Task<IEnumerable<TypeRoom>> GetTypeRooms()
        {
            var data = await _chartsRepository.GetTypeRooms();
            return data;
        }
        
        [HttpGet("type-beds")]
        public async Task<IEnumerable<TypeBed>> GetTypeBeds()
        {
            var data = await _chartsRepository.GetTypeBeds();
            return data;
        }  
    }
}