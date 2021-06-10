using System;
using System.Collections.Generic;
using System.Globalization;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using AirBNB_React_App.Helpers;
using GeoJSON.Net.Feature;
using GeoJSON.Net.Geometry;
using Newtonsoft.Json;

namespace AirBNB_React_App.Repositories
{
    public class ListingRepository : IListingsRepository
    {
        private readonly AirBNBContext _context;

        public ListingRepository(AirBNBContext context)
        {
            _context = context;
        }

        public async Task<string> GetLocations()
        {
            var locationsList = await _context.Listings.Select(location => new Locations
            {
                Id = location.Id,
                Name = location.Name,
                Price = location.Price,
                Latitude = location.Latitude,
                Longitude = location.Longitude
            }).AsNoTracking().ToListAsync();
            
            var locationsConverter = new LocationsConverter();
            var json = locationsConverter.ConvertToGeoJson(locationsList);
            
            return json;
        }

        public async Task<List<Neighbourhood>> GetNeighbourhoods()
        {
            var neighbourhoods = await Task.Run(() => _context.Listings
                .Select(n => new Neighbourhood {Neighbourhood1 = n.Neighbourhood})
                .Where(w => w.Neighbourhood1 != null)
                .Distinct()
                .ToListAsync());
            return neighbourhoods;
        }

        public async Task<string> GetLocationFilterNeighbourhood(string neighbourhoodFilter)
        {
            var locationsList = await _context.Listings.Where(x => x.Neighbourhood == neighbourhoodFilter)
                .Select(location => new Locations
                    {Id = location.Id, Latitude = location.Latitude, Longitude = location.Longitude})
                .ToListAsync();
            var json = ConvertToGeoJson(locationsList);
            return json;
        }

        private static string ConvertToGeoJson(List<Locations> loc)
        {
            var model = new FeatureCollection();
            foreach (Locations item in loc)
            {
                item.Latitude = Double.Parse(item.Latitude.ToString().Insert(2, "."), CultureInfo.InvariantCulture);
                item.Longitude = Double.Parse(item.Longitude.ToString().Insert(1, "."), CultureInfo.InvariantCulture);

                var geom = new Point(new Position(item.Latitude, item.Longitude));
                var props = new Dictionary<string, object> {{"id", item.Id}};
                var feature = new Feature(geom, props);

                model.Features.Add(feature);
            }

            var json = JsonConvert.SerializeObject(model);
            return json;
        }
    }
}