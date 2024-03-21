"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import SocialLogin from "./SocialLogin";
import Link from "next/link";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useState, useTransition } from "react";
import { loginSchema } from "@/Schemas";
import { login } from "@/actions/login";
import FormError from "./form-error";
import FormSuccess from "./form-success";

const Login = () => {
  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(data).then((value) => {
        loginForm.reset();
        setError(value.error);
        setSuccess(value.success);
      });
    });
  };

  return (
    <section className="w-full lg:w-3/5 space-y-8 mx-auto">
      <div className="space-y-2">
        <h2 className="font-roboto text-3xl font-semibold text-dark">
          Welcome to Euphoria !!
        </h2>
      </div>
      <SocialLogin />

      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark text-base">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-dark-grey text-sm"
                    placeholder="Enter your e-mail"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel className="text-dark text-base">
                    Password
                  </FormLabel>
                  {show ? (
                    <FaRegEye
                      size={24}
                      className="cursor-pointer"
                      onClick={() => setShow(!show)}
                    />
                  ) : (
                    <FaRegEyeSlash
                      size={24}
                      className="cursor-pointer"
                      onClick={() => setShow(!show)}
                    />
                  )}
                </div>

                <FormControl>
                  <Input
                    type={show ? "text" : "password"}
                    className="text-dark-grey text-sm"
                    placeholder={show ? "Password" : "********"}
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription className="font-poppins font-medium text-base text-dark-grey text-right">
                  <Link href={"forgot"}>Forgot your Password?</Link>
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="text-white text-base"
            disabled={isPending}
          >
            Login
          </Button>
        </form>
        <p className="font-poppins font-medium text-base text-dark-grey">
          Didnot have an account?{" "}
          <Link className="text-gray-900" href={"/register"}>
            Register
          </Link>{" "}
        </p>
      </Form>
    </section>
  );
};

export default Login;
