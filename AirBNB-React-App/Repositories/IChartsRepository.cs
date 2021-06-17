using System.Collections.Generic;
using System.Threading.Tasks;

namespace AirBNB_React_App.Repositories
{
    public interface IChartsRepository
    {
        Task<IEnumerable<NeighbourhoodChart>> GetAveragePriceNeighbourhoodInfoChart();
        Task<IEnumerable<TypeBed>> GetTypeBeds();
        Task<IEnumerable<TypeAccommodation>> GetTypeAccommodations();
        Task<IEnumerable<TypeRoom>> GetTypeRooms();
    }
}