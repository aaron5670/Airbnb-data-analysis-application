using System.Threading.Tasks;

namespace AirBNB_React_App.Repositories
{
    public interface IChartsRepository
    {
        Task<string> GetData();
    }
}