namespace application.Core
{
    public class Result<T>
    {
        public bool IsSuccess {get; private set;}
        public T Value {get; private set;}
        public string Error {get; private set;}

        public Result(T value) 
        {
            IsSuccess = true;
            Value = value;
        }

        public Result(string error) 
        {
            IsSuccess = false;
            Error = error;
        }
    }

    public class Result
    {
        public static Result<T> Success<T>(T value) => new Result<T>(value);
        public static Result<T> Failure<T>(string error) => new Result<T>(error);
    }
}