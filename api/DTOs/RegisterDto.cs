using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        //  note this rule is duplicated in startup
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$", 
            ErrorMessage = "Password must contain 1 digit, 1 uppercase character, 1 lowercase character and be at least 8 characters long.")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }
    }
}