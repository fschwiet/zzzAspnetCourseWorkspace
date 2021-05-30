using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using domain;
using Microsoft.IdentityModel.Tokens;

namespace api.Services
{
    public class TokenService
    {
        private readonly TokenKeyService tokenKey;

        public TokenService(TokenKeyService tokenKey)
        {
            this.tokenKey = tokenKey;
        }

        public string GetToken(AppUser user)
        {
            var claims = new List<Claim>() {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var creds = new SigningCredentials(tokenKey.Value, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}