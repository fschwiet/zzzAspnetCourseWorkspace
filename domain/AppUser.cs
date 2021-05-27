using Microsoft.AspNetCore.Identity;

namespace domain
{
    public class AppUser : IdentityUser
    {
        public AppUser() {}
        public string DisplayName {get; set;}
        public string Bio { get; set;}
    }
}