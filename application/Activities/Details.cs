using System;
using System.Threading;
using System.Threading.Tasks;
using application.Core;
using domain;
using MediatR;
using persistence;

namespace application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<Activity>> 
        { 
            public Query(Guid id)
            {
                Id = id;
            }

            public Guid Id { get; }
        }

        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await context.Activities.FindAsync(new object[] { request.Id}, cancellationToken);
                return Result.Success(result); 
            }
        }
    }
}