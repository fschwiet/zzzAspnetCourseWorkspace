using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace api.Services
{
    public class TokenKeyService
    {
        public TokenKeyService(IConfiguration configuration)
        {
            // expected: super secret key
            var tokenSecret = configuration["TokenKey"];
            this.Value = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSecret));
        }

        public SymmetricSecurityKey Value {get;}
    }
}