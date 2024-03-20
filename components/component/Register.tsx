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
import { Checkbox } from "@/components/ui/checkbox";
import SocialLogin from "./SocialLogin";
import Link from "next/link";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useState, useTransition } from "react";
import { registerSchema } from "@/Schemas";
import { register } from "@/actions/register";
import FormError from "./form-error";
import FormSuccess from "./form-success";

const Register = () => {
  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      terms: false,
      subscribe: false,
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    setError("");
    setSuccess("");

    if (!data.terms) return setError("Terms and conditions should be agreed.");

    startTransition(() => {
      register(data).then((value) => {
        registerForm.reset();
        setError(value.error);
        setSuccess(value.success);
      });
    });
  };

  return (
    <section className="w-full lg:w-3/5 space-y-8 mx-auto">
      <div className="space-y-2">
        <h2 className="font-roboto text-3xl font-semibold text-dark">
          Register
        </h2>
        <p className="font-poppins font-medium text-base text-dark-grey">
          Register for free to access to in any of our products
        </p>
      </div>
      <SocialLogin />

      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={registerForm.control}
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
            control={registerForm.control}
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
                <FormDescription className="font-poppins font-medium text-base text-dark-grey">
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="space-x-3 h-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isPending}
                    className="text-white text-xs"
                  />
                </FormControl>
                <FormLabel className="text-base font-medium font-poppins text-dark-grey">
                  Agree to our Terms of use and Privacy Policy
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="subscribe"
            render={({ field }) => (
              <FormItem className="space-x-3 h-6">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isPending}
                    className="text-white text-xs"
                  />
                </FormControl>
                <FormLabel className="text-base font-medium font-poppins text-dark-grey">
                  Subscribe to our monthly newsletter
                </FormLabel>
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
            Register
          </Button>
        </form>
        <p className="font-poppins font-medium text-base text-dark-grey">
          Already have an account?{" "}
          <Link className="text-gray-900" href={"/login"}>
            Login
          </Link>{" "}
        </p>
      </Form>
    </section>
  );
};

export default Register;
