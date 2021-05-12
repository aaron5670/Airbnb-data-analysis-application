using System.Threading.Tasks;

namespace AirBNB_React_App.Repositories
{
    public interface IListingsRepository
    {
        Task<string> GetLocations();

        string GetListings();
    }
}