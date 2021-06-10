using System;
using StackExchange.Redis;

namespace AirBNB_React_App.Helpers
{
    public class ListingCache : IListingCaching
    {
        private readonly IDatabase _cache;
        private const string KEY = "listings";
        private const int EXPIRE = 30;

        public ListingCache(IConnectionMultiplexer connectionMultiplexer)
        {
            _cache = connectionMultiplexer.GetDatabase();
        }

        public string GetCachedLocations()
        {
            var cache = _cache.StringGet(KEY);
            return cache;
        }

        public bool CacheExists()
        {
            return _cache.KeyExists(KEY);
        }

        public void SetCachedLocations(string locations)
        {
            _cache.StringSet(KEY, locations);
            _cache.KeyExpire(KEY, DateTime.Now.AddSeconds(EXPIRE));
        }
    }
}