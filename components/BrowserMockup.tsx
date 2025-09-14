import Image from "next/image";
import React from "react";

interface MockupProps {
  imageUrl: string;
  url?: string;
}

const BrowserMockup = ({ imageUrl, url }: MockupProps) => {
  return (
    <div className="mockup-browser border border-base-300 w-full bg-zinc-800 rounded-2xl">
      <div className="mockup-browser-toolbar">
        <div className="input">{url}</div>
      </div>
      <Image
        src={imageUrl}
        width={1000}
        height={1000}
        alt={url || "Website Screenshot"}
        className="w-full"
      />
    </div>
  );
};

export default BrowserMockup;
