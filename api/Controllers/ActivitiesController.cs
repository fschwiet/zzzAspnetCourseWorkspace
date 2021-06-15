using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using application.Activities;
using domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<ActionResult<List<ActivityDto>>> GetActivities(CancellationToken ct)
        {
            return AsResponse(await mediator.Send(new application.Activities.List.Query(), ct));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityDto>> GetActivity(Guid id, CancellationToken ct)
        {
            return AsResponse(await mediator.Send(new application.Activities.Details.Query(id), ct));
        }

        [HttpPost]
        public async Task<ActionResult<ActivityDto>> CreateActivity(ActivityFormFieldsDto activity, CancellationToken ct)
        {
            return AsResponse(await mediator.Send(new application.Activities.Create.Command(activity), ct));
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<ActivityDto>> EditActivity(Guid id, ActivityFormFieldsDto activity, CancellationToken ct)
        {
            activity.Id = id;
            return AsResponse(await mediator.Send(new application.Activities.Edit.Command(activity), ct));
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> DeleteActivity(Guid id, CancellationToken ct)
        {
            return AsResponse(await mediator.Send(new application.Activities.Delete.Command(id), ct));
        }

        [HttpPost("{id}/toggle-attendance")]
        public async Task<ActionResult<ActivityDto>> ToggleAttendance(Guid id, CancellationToken ct)
        {
            return AsResponse(await mediator.Send(new application.Activities.UpdateAttendance.Command(id), ct));
        }
    }
}