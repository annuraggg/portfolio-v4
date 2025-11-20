"use client";

import { toast } from "sonner";
import { FormEvent, useEffect, useState } from "react";
import "animate.css";
import { getFeatureFlag } from "@/lib/config/configcat-server";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [isAngry, setIsAngry] = useState(false);
  const [isFeatureEnabled, setIsFeatureEnabled] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    getFeatureFlag("enablecontactform", false).then((value) => {
      setIsFeatureEnabled(value as boolean);
    });
  }, []);

  if (isFeatureEnabled === null) {
    return null; // or skeleton if you ever want
  }

  if (!isFeatureEnabled) {
    return null;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsAngry(true);
    return;

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
      toast.warning("You ain't Anurag :D");
      setIsAngry(true);
      setTimeout(() => setIsAngry(false), 1000);
      return;
    }

    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      toast.success("Message sent successfully");
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
      className={`mt-5 w-full md:max-w-[30vw] px-4 sm:px-0 animate__animated ${
        isAngry ? "animate__wobble" : ""
      }`}
    >
      <div className="flex flex-col">
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="border-b-4 rounded-lg border border-gray-500 p-2 m-2 bg-transparent w-full "
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border-b-4 rounded-lg border border-gray-500 p-2 m-2 bg-transparent w-full "
        />
      </div>

      <div className="flex flex-col">
        <input
          name="subject"
          type="text"
          placeholder="Subject"
          className="border-b-4 rounded-lg border border-gray-500 p-2 m-2 bg-transparent w-full "
        />
        <textarea
          name="message"
          cols={30}
          rows={5}
          placeholder="Message"
          className="border-b-4 rounded-lg border border-gray-500 p-2 m-2 bg-transparent w-full "
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-transparent flex items-center justify-center border-b-4 border w-full  border-gray-700 hover:border-gray-500 transition-all duration-300 text-white p-2 rounded-lg m-2 disabled:opacity-70"
        >
          {loading ? <span className="animate-pulse">Sending…</span> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
