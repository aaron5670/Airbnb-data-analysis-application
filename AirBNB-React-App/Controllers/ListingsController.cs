using System.Collections.Generic;
using System.Threading.Tasks;
using AirBNB_React_App.Helpers;
using AirBNB_React_App.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace AirBNB_React_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListingsController : ControllerBase
    {
        private readonly IListingsRepository _listingsRepository;
        private readonly IListingCaching _listingCache;
        
        public ListingsController(IListingsRepository listingsRepository, IListingCaching listingCaching)
        {
            _listingsRepository = listingsRepository;
            _listingCache = listingCaching;
        }

        [HttpGet("locations")]
        public async Task<string> GetLocations()
        {
            if (_listingCache.CacheExists())
            {
                var result = _listingCache.GetCachedLocations();
                return result;
            }
            var locations = await _listingsRepository.GetLocations();
            _listingCache.SetCachedLocations(locations);
            return locations;
        }
        
        [HttpGet("neighbourhoods")]
        public async Task<ActionResult<IEnumerable<Neighbourhood>>> GetNeighbourhoods()
        {
            return await _listingsRepository.GetNeighbourhoods();
        }

        [HttpGet("filter/neighbourhood")]
        public async Task<string> GetLocationFilter(string neighbourhood)
        {
            if (neighbourhood == "")
            {
                return await _listingsRepository.GetLocations();
            }

            return await _listingsRepository.GetLocationFilterNeighbourhood(neighbourhood);
        }
    }
}