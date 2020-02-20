using System;
using System.Security.Claims;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DatingApp.API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async  Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
        var resultContext = await next();
         var userId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
         var repo = (DatingRepository)resultContext.HttpContext.RequestServices.GetService(typeof(IDatingRepository));
         var user = await repo.GetUser(userId);
         user.LastTime = DateTime.Now; 
         await repo.SaveAll();
        }
    }
}