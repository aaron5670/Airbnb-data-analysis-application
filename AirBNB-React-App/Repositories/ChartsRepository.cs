using System;
using System.Threading.Tasks;

namespace AirBNB_React_App.Repositories
{
    public class ChartsRepository : IChartsRepository
    {
        private readonly AirBNBContext _context;

        public ChartsRepository(AirBNBContext context)
        {
            _context = context;
        }

        public Task<string> GetData()
        {
            throw new NotImplementedException();
        }
    }
}