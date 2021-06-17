using System;
using System.Collections.Generic;

#nullable disable

namespace AirBNB_React_App
{
    public partial class Calendar
    {
        public int ListingId { get; set; }
        public DateTime Date { get; set; }
        public string? Available { get; set; }
        public int? Price { get; set; }

        public virtual Listing Listing { get; set; }
    }
}
