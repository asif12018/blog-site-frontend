"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field as UIField,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

import { Field, useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import * as z from "zod";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "minimum length is 8"),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({value}) => {
      const toastId = toast("Signin a user");
      try{
         
         const {error} = await authClient.signIn.email(value);
         if(error){
           toast.error(error.message, {id: toastId});
           return
         }
         toast.success("User Signin successfully",{id: toastId});
         router.push("/");
      }catch(err){
        toast.error("Internal server Error", {id: toastId});
      }
    },
  });
    const handleGoogleLogin = async() =>{
    const data = await authClient.signIn.social({
    provider: "google",
    callbackURL:"http://localhost:3000",
  });
  }
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login now</CardTitle>
        <CardDescription>
          Enter your information below to Log in your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>

            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <UIField >
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    ></Input>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </UIField>
                );
              }}
            />

            <form.Field
              name="password"
              children={(field) => {
                 const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <UIField>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    ></Input>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </UIField>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button form="login-form" type="submit" className="w-full cursor-pointer">
          Log in
        </Button>
      </CardFooter>
      <CardFooter className="flex justify-end ">
        <Button className="w-full" onClick={()=>handleGoogleLogin()} variant="outline" type="button">
                  Continue with Google
                </Button>
      </CardFooter>
    </Card>
  );
}
