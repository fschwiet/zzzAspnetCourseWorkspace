using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using application.Core;
using application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using persistence;

namespace application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Command(Guid id)
            {
                ActivityId = id;
            }

            public Guid ActivityId { get; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext dataContext;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext dataContext, IUserAccessor userAccessor)
            {
                this.dataContext = dataContext;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await dataContext.Activities
                    .Include(a => a.Attendees).ThenInclude(a => a.AppUser)
                    .FirstOrDefaultAsync(a => a.Id == request.ActivityId);

                if (activity == null)
                    return null;

                var user = await dataContext.Users.FirstOrDefaultAsync(u => u.UserName == userAccessor.GetUsername());

                if (user == null)
                    throw new Exception("User not found.");

                var hostUsername = activity.Attendees.FirstOrDefault(a => a.IsHost)?.AppUser?.UserName;

                var attendance = activity.Attendees.FirstOrDefault(a => a.AppUser.UserName == user.UserName);

                if (hostUsername == user.UserName)
                {
                    activity.IsCancelled = !activity.IsCancelled;
                }
                else
                {
                    if (attendance == null)
                    {
                        activity.Attendees.Add(new domain.ActivityAttendee
                        {
                            AppUser = user,
                            Activity = activity,
                            IsHost = false
                        });
                    }
                    else
                    {
                        activity.Attendees.Remove(attendance);
                    }
                }

                var result = await dataContext.SaveChangesAsync();

                return (result > 0)
                    ? Result.Success<Unit>(new Unit())
                    : Result.Failure<Unit>("No rows were changed in the database.");
            }
        }
    }
}