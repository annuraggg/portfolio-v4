import { Option } from "@/components/DirectionAwareSelect";
import React, { useState, useRef, useEffect } from "react";
import Select from "@/components/DirectionAwareSelect";
import DirectionHoverButton from "@/components/DirectionAwareButton";

const INDUSTRIES: Option<string>[] = [
  { value: "healthcare", label: "Healthcare" },
  { value: "fintech", label: "Fintech" },
  { value: "ecommerce", label: "eCommerce" },
  { value: "agrotech", label: "Agrotech" },
  { value: "hr-solutions", label: "HR solutions" },
  { value: "travel-hospitality", label: "Travel & Hospitality" },
  { value: "logistics", label: "Logistics" },
  { value: "elearning", label: "eLearning" },
  { value: "crypto", label: "Crypto" },
  { value: "real-estate", label: "Real Estate" },
  { value: "booking", label: "Booking" },
  { value: "other", label: "Other" },
];

const PLATFORMS: Option<string>[] = [
  { value: "web", label: "Web" },
  { value: "ios", label: "iOS" },
  { value: "android", label: "Android" },
];

export const FEATURES_OPTIONS: Option<string>[] = [
  { value: "users-accounts", label: "Users & Accounts" },
  { value: "user-generated-content", label: "User-generated content" },
  { value: "media-files-search", label: "Media, files & search" },
  {
    value: "calendars-booking-scheduling",
    label: "Calendars, booking & scheduling",
  },
  {
    value: "diagrams-charts-dashboards",
    label: "Diagrams, charts & dashboards",
  },
  { value: "gps-integration", label: "GPS integration" },
  { value: "social-features-messaging", label: "Social features & messaging" },
  { value: "notifications", label: "Notifications" },
  {
    value: "database-3rd-party-apis-data",
    label: "Database, 3rd-party APIs & data",
  },
  {
    value: "monetization-advertisement-payment",
    label: "Monetization, advertisement & payment processing",
  },
  {
    value: "admin-cms-reporting-analytics",
    label: "Admin panel, CMS, reporting & analytics",
  },
  { value: "localization", label: "Localization" },
  { value: "security-compliance", label: "Security & compliance" },
  { value: "ai-technologies", label: "AI technologies" },
  { value: "blockchain-nft", label: "Blockchain & NFT" },
];

type Estimate = {
  hours: number;
  days: number;
  hoursPerWeek: number;
};

const PLATFORM_BASE_HOURS: Record<string, number> = {
  web: 40,
  ios: 60,
  android: 60,
};

const FEATURE_HOURS: Record<string, number> = {
  "users-accounts": 16,
  "user-generated-content": 60,
  "media-files-search": 28,
  "calendars-booking-scheduling": 20,
  "diagrams-charts-dashboards": 28,
  "gps-integration": 16,
  "social-features-messaging": 48,
  notifications: 6,
  "database-3rd-party-apis-data": 28,
  "monetization-advertisement-payment": 36,
  "admin-cms-reporting-analytics": 28,
  localization: 8,
  "security-compliance": 48,
  "ai-technologies": 64,
  "blockchain-nft": 72,
};

const INDUSTRY_MULTIPLIER: Record<string, number> = {
  healthcare: 1.15,
  fintech: 1.18,
  ecommerce: 1.04,
  agrotech: 1.02,
  "hr-solutions": 1.02,
  "travel-hospitality": 1.03,
  logistics: 1.03,
  elearning: 1.02,
  crypto: 1.09,
  "real-estate": 1.02,
  booking: 1.03,
  other: 1.0,
};

function estimateProject(
  industry: string,
  platforms: string[],
  features: string[]
): Estimate {
  const hoursPerDay = 6;
  const platformHours = platforms.reduce(
    (sum, p) => sum + (PLATFORM_BASE_HOURS[p] ?? 40),
    0
  );
  const featureHours = features.reduce(
    (sum, f) => sum + (FEATURE_HOURS[f] ?? 12),
    0
  );
  const industryMult = INDUSTRY_MULTIPLIER[industry] ?? 1.0;
  const rawHours = (platformHours + featureHours) * industryMult;
  const finalHours = Math.ceil(rawHours * 1.3);
  const days = Math.ceil(finalHours / hoursPerDay);
  const hoursPerWeek = hoursPerDay * 5;
  return { hours: finalHours, days, hoursPerWeek };
}

const Calculator = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [industry, setIndustry] = useState<string | null>("ecommerce");
  const [platform, setPlatform] = useState<string[] | null>(null);
  const [featureSet, setFeatureSet] = useState<string[] | null>(null);
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      setShow(false);
    };

    dialog.addEventListener("close", handleClose);

    if (show) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, [show, setShow]);

  const handleCalculate = () => {
    if (!industry) {
      setError("Please select an industry.");
      setEstimate(null);
      return;
    }
    if (!platform || platform.length === 0) {
      setError("Please choose at least one platform.");
      setEstimate(null);
      return;
    }
    if (!featureSet || featureSet.length === 0) {
      setError("Please choose at least one feature.");
      setEstimate(null);
      return;
    }
    setError(null);
    const est = estimateProject(industry, platform, featureSet);
    setEstimate(est);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 80);
  };

  const handleReset = () => {
    setIndustry("ecommerce");
    setPlatform(null);
    setFeatureSet(null);
    setEstimate(null);
    setError(null);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <dialog id="my_modal_1" className="modal" ref={dialogRef}>
      <div className="modal-box bg-background w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-[100vw] min-h-screen py-12 sm:py-16 md:py-20 flex justify-center">
        <div className="w-full px-4 sm:px-6">
          <h3 className="text-sm sm:text-md font-medium">
            Calculate project time
          </h3>

          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div>
            <p className="text-xl sm:text-2xl md:text-3xl font-medium my-5 mt-12 sm:mt-16 md:mt-20">
              What&apos;s your business domain?
            </p>
            <Select
              items={INDUSTRIES}
              value={industry}
              onChange={(v) => setIndustry(v as string | null)}
              buttonClassName="px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base"
              renderOption={(opt) => (
                <span className="px-2 sm:px-3">{opt.label}</span>
              )}
            />
          </div>

          <div>
            <p className="text-xl sm:text-2xl md:text-3xl font-medium my-5 mt-12 sm:mt-16 md:mt-20">
              Choose the platforms for your project
            </p>
            <Select
              items={PLATFORMS}
              value={platform}
              onChange={(v) => setPlatform((v as string[] | null) ?? [])}
              buttonClassName="px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base"
              renderOption={(opt) => (
                <span className="px-2 sm:px-3">{opt.label}</span>
              )}
              multiple
            />
          </div>

          <div>
            <p className="text-xl sm:text-2xl md:text-3xl font-medium my-5 mt-12 sm:mt-16 md:mt-20">
              What features should your app have?
            </p>
            <Select
              items={FEATURES_OPTIONS}
              value={featureSet}
              onChange={(v) => setFeatureSet((v as string[] | null) ?? [])}
              buttonClassName="px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base"
              renderOption={(opt) => (
                <span className="px-2 sm:px-3">{opt.label}</span>
              )}
              multiple
            />
          </div>

          <hr className="my-6 sm:my-8" />

          <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end pb-10">
            <DirectionHoverButton
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base"
              onClick={handleCalculate}
            >
              Calculate
            </DirectionHoverButton>

            <DirectionHoverButton
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base"
              onClick={handleReset}
            >
              Reset
            </DirectionHoverButton>

            <DirectionHoverButton
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base"
              onClick={handleClose}
            >
              Close
            </DirectionHoverButton>
          </div>

          {error && (
            <div className="mt-4" role="alert" aria-live="assertive">
              <div className="text-xl sm:text-2xl md:text-3xl text-center pb-8 sm:pb-10 font-medium">
                {error}
              </div>
            </div>
          )}

          {estimate && (
            <div ref={resultRef} className="pb-12 sm:pb-16 md:pb-20">
              <div style={{ textAlign: "center" }}>
                <div
                  className="text-4xl sm:text-5xl md:text-6xl font-bold"
                  aria-live="polite"
                >
                  {estimate.days} days
                </div>
                <div className="mt-2 text-base sm:text-lg">
                  {estimate.hoursPerWeek} hrs / week
                </div>
                <div className="mt-6 text-sm opacity-70">
                  Press ESC to close
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default Calculator;
