
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;

namespace VNPT2021.API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class BaseController : Controller, IActionFilter
    {
        public BaseController()
        {
        }       
    }
}
