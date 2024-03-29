using domain;
using FluentValidation;

namespace application.Activities
{
    public class ActivityValidator : AbstractValidator<ActivityFormFieldsDto>
    {
        public ActivityValidator()
        {
            RuleFor(a => a.Title).NotEmpty();
            RuleFor(a => a.Description).NotEmpty();
            RuleFor(a => a.Date).NotEmpty();
            RuleFor(a => a.Category).NotEmpty();
            RuleFor(a => a.City).NotEmpty();
            RuleFor(a => a.Venue).NotEmpty();
        }
    }
}