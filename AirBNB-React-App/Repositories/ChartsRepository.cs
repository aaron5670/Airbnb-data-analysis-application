using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace AirBNB_React_App.Repositories
{
    public class ChartsRepository : IChartsRepository
    {
        private readonly AirBNBContext _context;

        public ChartsRepository(AirBNBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Chart>> GetReviewInfoChart()
        {
            var charts = await Task.Run(() => _context.Listings
                .GroupBy(x => x.ReviewScoresRating / 10)
                .Select(s => new Chart
                {
                    Numbers = s.Key,
                    Count = s.Count()
                }).ToListAsync());
            var ratings = charts.Where(x => x.Numbers != null).ToArray();
            return ratings;
        }

        public async Task<IEnumerable<Chart>> GetAvailabilityInfoChart()
        {
            var charts = await Task.Run(() => _context.Listings
                .GroupBy(x => x.Availability30)
                .Select(s => new Chart
                {
                    Numbers = s.Key,
                    Count = s.Count()
                }).ToListAsync());
            var data = charts.Where(x => x.Numbers != 0).ToArray();

            return data;
        }

        public async Task<IEnumerable<NeighbourhoodChart>> GetAveragePriceNeighbourhoodInfoChart()
        {
            var charts = await Task.Run(() => _context.Listings
                .GroupBy(x => x.Neighbourhood)
                .Select(s => new NeighbourhoodChart
                {
                    Neighbourhood = s.Key,
                    AveragePrice = s.Average(x => Convert.ToDouble(
                        x.Price.Replace("$", "")
                            .Replace(",", "")
                            .Replace(".00", "")
                    ))
                }).ToListAsync());
            
            //var data = charts.Where(x => x.Neighbourhood != null).ToArray();

            return charts;
        }

        public async Task<IEnumerable<TypeBed>> GetTypeBeds()
        {
            var charts = await Task.Run(() => _context.Listings
                .GroupBy(x => x.BedType)
                .Select(s => new TypeBed
                {
                    Type = s.Key,
                    Count = s.Select(l => l.Id).Distinct().Count()
                }).ToListAsync());

            return charts;
        }
        
        public async Task<IEnumerable<TypeAccommodation>> GetTypeAccommodations()
        {
            var charts = await Task.Run(() => _context.Listings
                .GroupBy(x => x.PropertyType)
                .Select(s => new TypeAccommodation()
                {
                    Type = s.Key,
                    Count = s.Select(l => l.Id).Distinct().Count()
                }).ToListAsync());

            return charts;
        }        
        
        public async Task<IEnumerable<TypeRoom>> GetTypeRooms()
        {
            var charts = await Task.Run(() => _context.Listings
                .GroupBy(x => x.RoomType)
                .Select(s => new TypeRoom()
                {
                    Type = s.Key,
                    Count = s.Select(l => l.Id).Distinct().Count()
                }).ToListAsync());

            return charts;
        }
    }
}