using System.Security.Claims;
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

            return CreateUserDto(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto register)
        {
            // hmm, string comparison could already be case insensitive depending on how your db is setup
            if (await userManager.Users.AnyAsync(u => u.Email == register.Email))
            {
                ModelState.AddModelError("email", "Email address not available.");
                return ValidationProblem();
            }

            if (await userManager.Users.AnyAsync(u => u.UserName == register.Username))
            {
                ModelState.AddModelError("username", "Username is not available.");
                return ValidationProblem();
            }

            var user = new AppUser() {
                DisplayName = register.DisplayName,
                UserName = register.Username,
                Email = register.Email
            };

            var result = userManager.CreateAsync(user, register.Password);

            if (result.Result.Succeeded)
            {
                return CreateUserDto(user);
            }

            return BadRequest("Problem registering user");
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserDto(user);
        } 

        private UserDto CreateUserDto(AppUser user)
        {
            return new UserDto() {
                DisplayName = user.DisplayName,
                Image = null,
                Token = tokenService.GetToken(user),
                Username = user.UserName
            };
        }
    }
}