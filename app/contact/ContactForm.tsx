"use client";

import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { FormEvent, useState } from "react";
import "animate.css";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [isAngry, setIsAngry] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const subject = String(fd.get("subject") || "");
    const message = String(fd.get("message") || "");

    if (!name || !email || !subject || !message) {
      toast.error("Please fill all the fields");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (
      email === "hello@anuragsawant.in" ||
      email === "contact@anuragsawant.in"
    ) {
      toast.warning("You can't pretend to be me!");
      toast.warning("YOU MADE THE WEBSITE ANGRY! 😡");
      setIsAngry(true);
      setTimeout(() => setIsAngry(false), 1000);
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { name, email, subject, message },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      );

      toast.success("Message sent successfully");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again later");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`mt-5 md:w-auto w-[85vw] animate__animated ${
        isAngry ? "animate__wobble" : ""
      }`}
    >
      <div className="flex">
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="border-b-4 rounded-lg border border-gray-500 p-2 m-2 bg-transparent w-[50%]"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border-b-4 rounded-lg border border-gray-500 p-2 m-2 bg-transparent w-[50%]"
        />
      </div>

      <div className="flex flex-col">
        <input
          name="subject"
          type="text"
          placeholder="Subject"
          className="border-b-4 rounded-lg border border-gray-500 p-2 m-2 bg-transparent"
        />
        <textarea
          name="message"
          cols={30}
          rows={5}
          placeholder="Message"
          className="border-b-4 rounded-lg border border-gray-500 p-2 m-2 bg-transparent"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-transparent flex items-center justify-center border-b-4 border border-gray-700 hover:border-gray-500 transition-all duration-300 text-white p-2 rounded-lg m-2 disabled:opacity-70"
        >
          {loading ? <span className="animate-pulse">Sending…</span> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
