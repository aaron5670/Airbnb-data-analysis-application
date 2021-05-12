using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using AirBNB_React_App.Helpers;

namespace AirBNB_React_App.Repositories
{
    public class ListingRepository : Repository<Listing>, IListingsRepository
    {
        public AirBNBContext Context => _context;

        public ListingRepository(AirBNBContext context) : base(context)
        {
        }

        public async Task<string> GetLocations()
        {
            var locationsList = await Context.Listings.Select(location => new Locations
            {
                Id = location.Id,
                Latitude = location.Latitude,
                Longitude = location.Longitude
            }).ToListAsync();

            var locationsConverter = new LocationsConverter();
            
            var json = locationsConverter.ConvertToGeoJson(locationsList);
            return json;
        }

        public string GetListings()
        {
            return "Test Listing";
        }

    }
}