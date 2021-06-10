using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
        
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext dataContext;
        private readonly IHttpContextAccessor httpContextAccessor;

        public IsHostRequirementHandler(DataContext dataContext, IHttpContextAccessor httpContextAccessor)
        {
            this.dataContext = dataContext;
            this.httpContextAccessor = httpContextAccessor;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return;

            var routeValue = httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(r => r.Key == "id").Value.ToString();
            Guid activityId;

            if (!Guid.TryParse(routeValue, out activityId))
                return;

            var isHost = await dataContext.ActivityAttendees
                //.AsNoTracking()  - AsNoTracking was needing in the course version as they 
                // loaded the entity, causing it to be tracked.  This actually caused a bug
                // later if an edit activity request was done, EF would get confused and think
                // the attendees had been modified.
                .AnyAsync(aa => aa.ActivityId == activityId && aa.AppUserId == userId && aa.IsHost);

            if (!isHost)
                return;

            context.Succeed(requirement);

            return;
        }
    }
}