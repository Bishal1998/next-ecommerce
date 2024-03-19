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
import { useState } from "react";

interface IRegisterForm {
  email: string;
  password: string;
}

const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(
      /^\S*(?=\S{8,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
      {
        message:
          "Password must contain at least one uppercase, one lowercase, one number and one special characters",
      }
    ),
});

const Register = () => {
  const [show, setShow] = useState(false);

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: IRegisterForm) => {
    console.log(data);
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
                    placeholder="**********"
                    {...field}
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
          <div className="flex items-center space-x-2 whitespace-nowrap">
            <Checkbox id="terms" className="text-white" />
            <label
              htmlFor="terms"
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-poppins text-dark-grey"
            >
              Agree to our Terms of use and Privacy Policy
            </label>
          </div>
          <div className="flex items-center space-x-2 whitespace-nowrap">
            <Checkbox id="terms" className="text-white" />
            <label
              htmlFor="terms"
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-poppins text-dark-grey"
            >
              Subscribe to our monthly newsletter
            </label>
          </div>
          <Button type="submit" className="text-white text-base">
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
