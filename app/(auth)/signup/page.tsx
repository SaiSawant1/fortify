"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signupFormSchema, signupFormSchemaType } from "@/schema/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { CreateNewUser } from "@/action/create-user";

export default function SignupPage() {
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [error, setError] = useState("");
  const form = useForm<signupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (value: signupFormSchemaType) => {
    setError("");
    if (confirmationPassword !== value.password) {
      console.log(confirmationPassword);
      setError("Passwords don't match");
    } else {
      CreateNewUser(value)
        .then((resp) => console.log(resp))
        .catch((err) => setError(err));
    }
  };
  return (
    <div className="bg-brand_secondary/90 h-full w-full flex justify-center items-center">
      <Card className="bg-brand_secondary/50">
        <CardHeader>
          <CardTitle className="text-brand_primary text-center font-bold text-2xl">
            Sing-Up
          </CardTitle>
          <CardDescription>Create a new Fortify account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-label="name" className="text-white">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="name"
                        className="text-white"
                        placeholder="john doe"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-label="email" className="text-white">
                      Eamil
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="text-white"
                        placeholder="johndoe@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter your email.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-label="password" className="text-white">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="text-white"
                        placeholder="password@johndoe"
                        data-testid="password"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel aria-label="password" className="text-white">
                  Confirmation Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="text-white"
                    placeholder="password@johndoe"
                    onChange={(e) => setConfirmationPassword(e.target.value)}
                    data-testid="confirmationPassword"
                  />
                </FormControl>
                <FormDescription>
                  Enter Password once more form Confimation.
                </FormDescription>
                {error && (
                  <div aria-label="error-message" className="text-red-600">
                    {error}
                  </div>
                )}
              </FormItem>
              <Button
                className="text-brand_primary/50 hover:text-brand_primary border-white border bg-brand_secondary transition-all hover:bg-brand_secondary/10 mt-5"
                aria-label="submit-signup"
              >
                Sing-Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-secondary">
          Alredy have an account?{" "}
          <Link className="text-brand_primary" href="/login">
            {" "}
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
