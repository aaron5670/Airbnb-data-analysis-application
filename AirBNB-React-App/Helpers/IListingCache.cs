namespace AirBNB_React_App.Helpers
{
    public interface IListingCaching
    {
        bool CacheExists();
        
        void SetCachedLocations(string locations);
        
        string GetCachedLocations();
    }
}