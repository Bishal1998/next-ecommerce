import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <section className="flex flex-col lg:flex-row justify-start h-full lg:h-[calc(100vh-112px)] overflow-hidden">
      <div className="w-full h-full lg:w-[696px] lg:h-[882px] relative hidden lg:flex">
        <Image
          src={
            "https://images.pexels.com/photos/13190014/pexels-photo-13190014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          fill
          alt="Image"
          className="object-cover rounded-xl"
        />
      </div>
      {children}
    </section>
  );
};

export default AuthLayout;
