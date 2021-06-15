using System;
using System.Collections.Generic;
using application.Profiles;

namespace application.Activities
{
    public class ActivityDto : ActivityFormFieldsDto
    {
        public string HostUsername { get; set; }
        public ICollection<Profile> Attendees { get; set; }
    }
}