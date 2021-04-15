using System.Threading;
using System.Threading.Tasks;
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

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(new object[] { request.Activity.Id}, cancellationToken);
                
                activity.Title = request.Activity.Title ?? activity.Title;
                
                await context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}