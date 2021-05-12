namespace AirBNB_React_App.Repositories
{
    public class Repository<TEntity> where TEntity : class
    {
        public readonly AirBNBContext _context;

        public Repository(AirBNBContext context)
        {
            _context = context;
        }
    }
}