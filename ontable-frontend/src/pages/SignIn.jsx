import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// Auth
import authSevices from '@/services/auth.services'



const SignIn = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    
    try {
      const response = await authSevices.register(payload);
      console.log("User registered successfully:", response);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }


  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription className="text-lg">Sign in to upload pictures.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input id="userName" name="userName" placeholder="username" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input id="email" name="email" placeholder="Email Id" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input id="password" name="password" placeholder="Password" required />
              </div>
            </div>
            <CardFooter className="flex justify-center mt-5">
              <Button type="submit" className="min-w-52 text-xl text-center">Sign In</Button>
            </CardFooter>
          </form>
        </CardContent>

      </Card>
    </div>
  )
}

export default SignIn