using System;
using System.Collections.Generic;
using System.Globalization;
using GeoJSON.Net.Feature;
using GeoJSON.Net.Geometry;
using Newtonsoft.Json;

namespace AirBNB_React_App.Helpers
{
    public class LocationsConverter
    {
        public string ConvertToGeoJson(List<Locations> loc)
        {
            var model = new FeatureCollection();
            foreach (var item in loc)
            {
                item.Latitude = Double.Parse(item.Latitude.ToString().Insert(2, "."), CultureInfo.InvariantCulture);
                item.Longitude = Double.Parse(item.Longitude.ToString().Insert(1, "."), CultureInfo.InvariantCulture);
                var geom = new Point(new Position(item.Latitude, item.Longitude));
                var props = new Dictionary<string, object>
                {
                    {"id", item.Id},
                    {"name", item.Name},
                    {"price", Int32.Parse(item.Price.Replace("$", "").Replace(",", "").Replace(".00", ""))},
                    {"latitude", item.Latitude},
                    {"longitude", item.Longitude}
                };
                var feature = new Feature(geom, props);
                model.Features.Add(feature);
            }

            var json = JsonConvert.SerializeObject(model);
            return json;
        }
    }
}