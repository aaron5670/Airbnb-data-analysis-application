using System.Collections.Generic;
using System.Threading.Tasks;

namespace AirBNB_React_App.Repositories
{
    public interface IListingsRepository
    {
        Task<string> GetLocations();
        
        Task<List<Neighbourhood>> GetNeighbourhoods();

        Task<string> GetLocationFilterNeighbourhood(string neighbourhoodFilter);
    }
}