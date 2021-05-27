using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AirBNB_React_App.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ChartsController : ControllerBase
    {
        [HttpGet("user")]
        public string Test()
        {
            return "admin: false";
        }
        
        [HttpGet("admin")]
        [Authorize(Roles = "AdminUser")]
        public string Admin()
        {
            return "admin: true";
        }
    }
}