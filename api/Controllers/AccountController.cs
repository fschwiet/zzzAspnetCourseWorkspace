using System.Threading.Tasks;
using api.DTOs;
using api.Services;
using domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly TokenService tokenService;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto login) {
            var user = await userManager.FindByEmailAsync(login.Email);

            if (user == null)
                return Unauthorized();

            var result = await signInManager.CheckPasswordSignInAsync(user, login.Password, false);

            if (!result.Succeeded)
                return Unauthorized();

            return new UserDto() {
                DisplayName = user.DisplayName,
                Username = user.UserName,
                Token = tokenService.GetToken(user),
                Image = "/assets/user.png"
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto register)
        {
            // hmm, string comparison could already be case insensitive depending on how your db is setup
            if (await userManager.Users.AnyAsync(u => u.Email == register.Email))
            {
                return BadRequest("Email not available.");
            }

            if (await userManager.Users.AnyAsync(u => u.UserName == register.Username))
            {
                return BadRequest("Username not available.");
            }

            var user = new AppUser() {
                DisplayName = register.DisplayName,
                UserName = register.Username,
                Email = register.Email
            };

            var result = userManager.CreateAsync(user, register.Password);

            if (result.Result.Succeeded)
            {
                return new UserDto() {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = tokenService.GetToken(user),
                    Username = user.DisplayName
                };
            }

            return BadRequest("Problem registering user");
        }
    }
}