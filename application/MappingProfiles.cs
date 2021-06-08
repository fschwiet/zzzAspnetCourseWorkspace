using System.Linq;
using application.Activities;
using AutoMapper;
using domain;

namespace application
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();

            CreateMap<Activity, ActivityDto>()
                .ForMember(a => a.HostUsername, 
                    o => o.MapFrom(a => a.Attendees.FirstOrDefault(h => h.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, application.Profiles.Profile>()
                .IncludeMembers(a => a.AppUser);

            CreateMap<AppUser, Profiles.Profile>();
        }
    }
}