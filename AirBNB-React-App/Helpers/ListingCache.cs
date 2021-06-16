using System;
using StackExchange.Redis;

namespace AirBNB_React_App.Helpers
{
    public class ListingCache : IListingCaching
    {
        private readonly IDatabase _cache;
        private const string Key = "listings";
        private const int Expire = 30;

        public ListingCache(IConnectionMultiplexer connectionMultiplexer)
        {
            _cache = connectionMultiplexer.GetDatabase();
        }

        public string GetCachedLocations()
        {
            var cache = _cache.StringGet(Key);
            return cache;
        }

        public bool CacheExists()
        {
            return _cache.KeyExists(Key);
        }

        public void SetCachedLocations(string locations)
        {
            _cache.StringSet(Key, locations);
            _cache.KeyExpire(Key, DateTime.Now.AddSeconds(Expire));
        }
    }
}