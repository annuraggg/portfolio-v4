import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="px-64 py-10">
      <div className="flex">
        <div className="flex-1">
          <h2 className="font-semibold text-lg">Made with ❤️ By Anurag</h2>
          <Link
            href={"https://buymeacoffee.com/annuraggg"}
            className="text-xs text-zinc-300"
          >
            Buy Me A Coffee?
          </Link>
        </div>
        <div className="flex">
          <div>
            <h4 className="text-sm text-zinc-400 mb-5">CONTACT</h4>
            <Link
              href={"mailto:hello@anuragsawant.in"}
              className="text-sm text-zinc-300 font-semibold mt-1 hover:text-accent transition-colors block"
            >
              <p>hello@anuragsawant.in</p>
            </Link>{" "}
            <Link
              href={"https://www.fiverr.com/s/BRp5Xbd"}
              className="text-sm text-zinc-300 font-semibold mt-1 hover:text-accent transition-colors block"
            >
              <p>Fiverr</p>
            </Link>{" "}
            <Link
              href={
                "https://www.upwork.com/freelancers/~019876de85b38cd093?mp_source=share"
              }
              className="text-sm text-zinc-300 font-semibold mt-1 hover:text-accent transition-colors block"
            >
              <p>Upwork</p>
            </Link>{" "}
            <Link
              href={"https://discord.com/users/564130664643952690"}
              className="text-sm text-zinc-300 font-semibold mt-1 hover:text-accent transition-colors block"
            >
              <p>Discord</p>
            </Link>{" "}
            <Link
              href={"https://www.linkedin.com/in/annuraggg"}
              className="text-sm text-zinc-300 font-semibold mt-1 hover:text-accent transition-colors block"
            >
              <p>LinkedIn</p>
            </Link>{" "}
            <Link
              href={"https://www.instagram.com/annuraggg"}
              className="text-sm text-zinc-300 font-semibold mt-1 hover:text-accent transition-colors block"
            >
              <p>Instagram</p>
            </Link>{" "}
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-zinc-400 mt-7">Last Updated on 19th July, 2025, 13:03 PM IST</p>
    </div>
  );
};

export default Footer;
