"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginFormSchema, loginFormSchemaType } from "@/schema/auth";
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

export default function LoginPage() {
  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (value: loginFormSchemaType) => {
    console.log(value);
  };
  return (
    <div className="bg-brand_secondary/90 h-full w-full flex justify-center items-center">
      <Card className="bg-brand_secondary/50">
        <CardHeader>
          <CardTitle className="text-brand_primary text-center font-bold text-2xl">
            Login
          </CardTitle>
          <CardDescription>
            Login to your account using the master key
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
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
                      password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="text-white"
                        placeholder="password@johndoe"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="text-brand_primary/50 hover:text-brand_primary border-white border bg-brand_secondary transition-all hover:bg-brand_secondary/10 mt-5"
                aria-label="submit-login"
              >
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-secondary">
          Do you want to create a new account?{" "}
          <Link className="text-brand_primary" href="/singup">
            {" "}
            Signup
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
