using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using persistence;

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
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await mediator.Send(new application.Activities.List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await mediator.Send( new application.Activities.Details.Query(id));
        }
    }
}