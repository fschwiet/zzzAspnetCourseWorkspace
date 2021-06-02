using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly IMediator mediator;

        public ActivitiesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct)
        {
            return AsResponse(await mediator.Send(new application.Activities.List.Query(), ct));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id, CancellationToken ct)
        {
            return AsResponse(await mediator.Send(new application.Activities.Details.Query(id), ct));
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateActivity(Activity activity, CancellationToken ct)
        {
            return AsResponse(await mediator.Send(new application.Activities.Create.Command(activity), ct));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditActivity(Guid id, Activity activity, CancellationToken ct)
        {
            activity.Id = id;
            return AsResponse(await mediator.Send(new application.Activities.Edit.Command(activity), ct));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteActivity(Guid id, CancellationToken ct)
        {
            return AsResponse(await mediator.Send(new application.Activities.Delete.Command(id), ct));
        }
    }
}