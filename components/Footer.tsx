import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className=" md:px-16 lg:px-32 xl:px-64 py-6 sm:py-8 md:py-10 px-6">
      <div className="flex flex-col md:flex-row gap-8 md:gap-0">
        <div className="flex-1">
          <h2 className="font-semibold text-base sm:text-lg">Made with ❤️ By Anurag</h2>
          <Link
            href={"https://buymeacoffee.com/annuraggg"}
            className="text-xs dark:text-zinc-300"
          >
            Buy Me A Coffee?
          </Link>
        </div>
        <div className="flex">
          <div>
            <h2 className="text-sm dark:text-zinc-400 mb-3 sm:mb-5">CONTACT</h2>
            <Link
              href={"mailto:hello@anuragsawant.in"}
              className="text-sm dark:text-zinc-300 font-semibold mt-1 hover:text-accent transition-colors block"
            >
              <p>hello@anuragsawant.in</p>
            </Link>{" "}
            <Link
              href={"https://www.fiverr.com/s/BRp5Xbd"}
              className="text-sm dark:text-zinc-300 font-semibold mt-1 hover:text-accent transition-colors block"
            >
              <p>Fiverr</p>
            </Link>{" "}
            <Link
              href={
                "https://www.upwork.com/freelancers/~019876de85b38cd093?mp_source=share"
              }
              className="text-sm dark:text-zinc-300 font-semibold mt-1 hover:text-accent transition-colors block"
            >
              <p>Upwork</p>
            </Link>{" "}
            <Link
              href={"https://discord.com/users/564130664643952690"}
              className="text-sm dark:text-zinc-300 font-semibold mt-1 hover:text-accent transition-colors block"
            >
              <p>Discord</p>
            </Link>{" "}
            <Link
              href={"https://www.linkedin.com/in/annuraggg"}
              className="text-sm dark:text-zinc-300 font-semibold mt-1 hover:text-accent transition-colors block"
            >
              <p>LinkedIn</p>
            </Link>{" "}
            <Link
              href={"https://www.instagram.com/annuraggg"}
              className="text-sm dark:text-zinc-300 font-semibold mt-1 hover:text-accent transition-colors block"
            >
              <p>Instagram</p>
            </Link>{" "}
          </div>
        </div>
      </div>
      <p className="text-center text-xs dark:text-zinc-400 mt-5 sm:mt-7">Last Updated on {process.env.NEXT_PUBLIC_UPDATED_AT}</p>
    </div>
  );
};

export default Footer;
