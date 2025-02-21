import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import authSevices from "@/services/auth.services";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/authSlice";
import { useLoginUserMutation } from "@/store/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.authSlice?.userData);

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isError:loginIsError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  useEffect(() => {
    if (loginIsSuccess && loginData) navigate("/home");
  }, [loginIsSuccess, loginData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputData = Object.fromEntries(formData);
    await loginUser(inputData);

    // try {
    //   const response = await authSevices.login(payload);
    //   console.log("response.data.user", response.data.user);
    //   if (response.statusCode === 200){
    //     dispatch(login({ userData: response.data.user }))
    //   };

    //   navigate("/home");

    // } catch (error) {
    //   console.log("Error in submit login data", error);
    // }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription className="text-lg">
            Login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input id="email" name="email" placeholder="Email Id" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input id="password" name="password" placeholder="Password" />
              </div>
            </div>
            {/* {loginError && (
              <h1 className="text-red-500 font-medium text-base">
                Error{loginError}
              </h1>
            )} */}
            {loginError && (
              <h1 className="text-red-500 font-medium text-sm">
                Error: {"Invalid credentials"}
              </h1>
            )}
            <CardFooter className="flex justify-center mt-5">
              <Button
                disabled={loginIsLoading}
                type="submit"
                className="min-w-52 text-xl text-center"
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin " /> Please
                    wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
