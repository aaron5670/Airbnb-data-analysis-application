using System.Collections.Generic;
using System.Threading.Tasks;

namespace AirBNB_React_App.Repositories
{
    public interface IListingsRepository
    {
        Task<string> GetLocations();
        
        Task<List<Neighbourhood>> GetNeighbourhoods();

        Task<string> GetLocationFilterNeighbourhood(string neighbourhood);
        
        Task<string> GetLocationFilterReview(int score);      
        
        Task<string> GetLocationFilter(string neighbourhood, int score);
    }
}