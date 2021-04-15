using AutoMapper;
using domain;

namespace application
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
        }
    }
}