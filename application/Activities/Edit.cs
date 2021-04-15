using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using domain;
using MediatR;
using persistence;

namespace application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Command(Activity activity)
            {
                Activity = activity;
            }

            public Activity Activity { get; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(new object[] { request.Activity.Id }, cancellationToken);

                mapper.Map(request.Activity, activity);

                await context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}