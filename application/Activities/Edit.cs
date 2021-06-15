using System.Threading;
using System.Threading.Tasks;
using application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using persistence;

namespace application.Activities
{
    public class Edit
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
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<ActivityDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(new object[] { request.Activity.Id }, cancellationToken);

                if (activity == null) return null;
                
                mapper.Map(request.Activity, activity);

                await context.SaveChangesAsync(cancellationToken);

                var result = await context.Activities
                    .ProjectTo<ActivityDto>(mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(a => a.Id == request.Activity.Id);

                return Result.Success(result);
            }
        }
    }
}