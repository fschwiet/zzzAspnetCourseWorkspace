using System;
using System.Threading;
using System.Threading.Tasks;
using domain;
using MediatR;
using persistence;

namespace application.Activities
{
    public class Delete
    {
        public class Command : IRequest 
        { 
            public Command(Guid id)
            {
                Id = id;
            }

            public Guid Id { get; }
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
                var activity = await context.Activities.FindAsync(request.Id, cancellationToken);

                context.Activities.Remove(activity);

                await context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}