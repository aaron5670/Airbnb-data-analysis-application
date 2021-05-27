using System.Threading.Tasks;
using AirBNB_React_App.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace AirBNB_React_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListingsController : ControllerBase
    {
        private readonly IListingsRepository _listingsRepository;
        
        public ListingsController(IListingsRepository listingsRepository)
        {
            _listingsRepository = listingsRepository;
        }

        [HttpGet("locations")]
        public async Task<string> GetLocations()
        {
            var locations = await _listingsRepository.GetLocations();
            return locations;
        }

        [HttpGet("test")]
        public string GetListings()
        {
            var locations = _listingsRepository.GetListings();
            return locations;
        }

        //
        // // GET: api/Listings/5
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Listing>> GetListing(int id)
        // {
        //     var listing = await _context.Listings.FindAsync(id);
        //
        //     if (listing == null)
        //     {
        //         return NotFound();
        //     }
        //
        //     return listing;
        // }
        //
        // // PUT: api/Listings/5
        // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutListing(int id, Listing listing)
        // {
        //     if (id != listing.Id)
        //     {
        //         return BadRequest();
        //     }
        //
        //     _context.Entry(listing).State = EntityState.Modified;
        //
        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!ListingExists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }
        //
        //     return NoContent();
        // }
        //
        // // POST: api/Listings
        // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPost]
        // public async Task<ActionResult<Listing>> PostListing(Listing listing)
        // {
        //     _context.Listings.Add(listing);
        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateException)
        //     {
        //         if (ListingExists(listing.Id))
        //         {
        //             return Conflict();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }
        //
        //     return CreatedAtAction("GetListing", new { id = listing.Id }, listing);
        // }
        //
        // // DELETE: api/Listings/5
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteListing(int id)
        // {
        //     var listing = await _context.Listings.FindAsync(id);
        //     if (listing == null)
        //     {
        //         return NotFound();
        //     }
        //
        //     _context.Listings.Remove(listing);
        //     await _context.SaveChangesAsync();
        //
        //     return NoContent();
        // }
        //
        // private bool ListingExists(int id)
        // {
        //     return _context.Listings.Any(e => e.Id == id);
        // }
    }
}
