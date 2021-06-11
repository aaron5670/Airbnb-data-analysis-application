using System;
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

        [HttpGet("filter")]
        public async Task<string> GetFilteredLocations(string neighbourhood, int score)
        {
            if (score != -1 && neighbourhood != null)
                return await _listingsRepository.GetLocationFilter(neighbourhood, score);

            if (score >= 1)
                return await _listingsRepository.GetLocationFilterReview(score);

            if (neighbourhood != null)
                return await _listingsRepository.GetLocationFilterNeighbourhood(neighbourhood);

            return await _listingsRepository.GetLocations();
        }
    }
}