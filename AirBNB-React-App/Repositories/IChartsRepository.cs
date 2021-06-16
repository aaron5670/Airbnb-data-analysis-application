using System.Collections.Generic;
using System.Threading.Tasks;

namespace AirBNB_React_App.Repositories
{
    public interface IChartsRepository
    {
        Task<IEnumerable<Chart>> GetReviewInfoChart();
        Task<IEnumerable<Chart>> GetAvailabilityInfoChart();
        Task<IEnumerable<NeighbourhoodChart>> GetAveragePriceNeighbourhoodInfoChart();
        Task<IEnumerable<TypeBeds>> GetTypeBeds();
        Task<IEnumerable<TypeAccommodation>> GetTypeAccommodations();
    }
}