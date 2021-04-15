using System;
using System.Threading;
using System.Threading.Tasks;
using domain;
using MediatR;
using persistence;

namespace application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity> 
        { 
            public Query(Guid id)
            {
                Id = id;
            }

            public Guid Id { get; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Activities.FindAsync(new object[] { request.Id}, cancellationToken);
            }
        }
    }
}