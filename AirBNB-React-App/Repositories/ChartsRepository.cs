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
                    Numbers = s.Key,
                    Count = s.Average(x => x.Availability30)
                }).ToListAsync());

            return charts;
        }

        public async Task<IEnumerable<TypeBeds>> GetTypeBeds()
        {
            var charts = await Task.Run(() => _context.Listings
                .GroupBy(x => x.BedType)
                .Select(s => new TypeBeds
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
    }
}