using System;
using System.Threading;
using System.Threading.Tasks;
using application.Core;
using domain;
using MediatR;
using persistence;

namespace application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        { 
            public Command(Guid id)
            {
                Id = id;
            }

            public Guid Id { get; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(new object[] { request.Id}, cancellationToken);

                if (activity == null) return null;
                
                context.Activities.Remove(activity);

                await context.SaveChangesAsync(cancellationToken);

                return Result.Success(Unit.Value);
            }
        }
    }
}