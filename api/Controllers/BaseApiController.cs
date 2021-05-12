using application.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected ActionResult<T> AsResponse<T>(Result<T> result)
        {
            //var logger =  (ILogger<BaseApiController>)HttpContext.RequestServices.GetService(typeof(ILogger<BaseApiController>));

            if (result == null)
                return NotFound();

            if (result.IsSuccess)
            {
                return result.Value != null ? Ok(result.Value) : NotFound();
            }

            return BadRequest(result.Error);
        }
    }
}
