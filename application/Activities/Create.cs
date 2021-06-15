using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using application.Core;
using application.Interfaces;
using AutoMapper;
using domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using persistence;

namespace application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<ActivityDto>>
        {
            public Command(ActivityFormFieldsDto activity)
            {
                Activity = activity;
            }

            public ActivityFormFieldsDto Activity { get; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<ActivityDto>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly IMapper mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<ActivityDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FirstAsync(u => u.UserName == userAccessor.GetUsername());
                var activity = mapper.Map<Activity>(request.Activity);

                var attendee = new ActivityAttendee()
                {
                    AppUser = user,
                    Activity = activity,
                    IsHost = true
                };

                activity.Attendees.Add(attendee);

                context.Activities.Add(activity);

                await context.SaveChangesAsync(cancellationToken);

                return Result.Success(mapper.Map<ActivityDto>(activity));
            }
        }
    }
}