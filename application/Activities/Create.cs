using System.Threading;
using System.Threading.Tasks;
using application.Core;
using domain;
using FluentValidation;
using MediatR;
using persistence;

namespace application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Command(Activity activity)
            {
                Activity = activity;
            }

            public Activity Activity { get; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
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
                context.Activities.Add(request.Activity);

                await context.SaveChangesAsync(cancellationToken);

                return Result.Success(Unit.Value);
            }
        }
    }
}