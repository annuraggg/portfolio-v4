"use client";

import { useInView, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Project } from "@/lib/db/projects";
import { getFeatureFlag } from "@/lib/config/configcat-server";

interface RatingProps {
  project: Project;
}

const StarsDisplay = ({
  rating,
  sizeClass = "rating-lg",
  readOnly = true,
  name = "rating-display",
  halves = true,
  onSelect,
}: {
  rating: number;
  sizeClass?: string;
  readOnly?: boolean;
  name?: string;
  halves?: boolean;
  onSelect?: (value: number) => void;
}) => {
  const count = halves ? 10 : 5;
  const activeIndex = halves ? Math.round(rating * 2) : Math.round(rating);

  return (
    <div className={`rating ${sizeClass} ${halves ? "rating-half" : ""}`}>
      <input type="radio" name={`${name}-hidden`} className="rating-hidden" />

      {Array.from({ length: count }).map((_, i) => {
        const value = halves ? (i + 1) / 2 : i + 1;
        const half = halves
          ? i % 2 === 0
            ? "mask-half-1"
            : "mask-half-2"
          : "";

        if (readOnly) {
          return (
            <div
              key={i}
              aria-label={`${value} stars`}
              className={`mask mask-star ${half} dark:bg-white bg-black`}
              defaultChecked={i + 1 === activeIndex}
              onClick={() => {
                if (!readOnly && onSelect) onSelect(value);
              }}
              aria-current={i + 1 === activeIndex ? "true" : "false"}
            />
          );
        }

        return (
          <input
            key={i}
            type="radio"
            name={name}
            aria-label={`${value} stars`}
            className={`mask mask-star-2 ${half} dark:bg-white bg-black`}
            defaultChecked={i + 1 === activeIndex}
            readOnly={readOnly}
            onClick={() => {
              if (!readOnly && onSelect) onSelect(value);
            }}
          />
        );
      })}
    </div>
  );
};

const Rating = ({ project }: RatingProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });

  const isFeatureEnabled = getFeatureFlag("enableprojectratings", false);

  const [rating, setRating] = useState<number | undefined>(undefined);
  const [userRating, setUserRating] = useState<number | undefined>(undefined);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch(`/api/ratings/${project.id}/stats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "user-identifier": localStorage.getItem("userIdentifier") || "",
          },
        });
        const data = await response.json();
        console.log(data);
        setRating(data.average_rating);
        setTotalRatings(data.total_ratings);
        setUserRating(data.user_rating);
      } catch (error) {
        console.error("Error fetching rating stats:", error);
      } finally {
      }
    };

    fetchRatings();
  }, [project.id]);

  const rate = async (value: number) => {
    try {
      const identity = localStorage.getItem("userIdentifier");
      await fetch(`/api/ratings/${project.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: value, userIdentifier: identity }),
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [localUserRating, setLocalUserRating] = useState<number | undefined>(
    userRating
  );

  const shouldShowRating = isFeatureEnabled;
  if (!shouldShowRating) return null;

  const displayedUserRating = localUserRating ?? userRating;

  const openModal = () => {
    setSelected(undefined);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSubmit = () => {
    if (!selected) return;
    setLocalUserRating(selected);
    closeModal();
    rate(selected);
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col gap-3 mt-7"
      >
        <div className="flex items-center gap-4">
          <StarsDisplay
            rating={rating ?? 0}
            halves
            readOnly
            sizeClass="rating-lg"
            name="avg-rating"
          />

          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold">{rating?.toFixed(1)}</span>
            <span className="text-xs opacity-70">{totalRatings} ratings</span>
          </div>

          <div className="flex-1" />

          {!displayedUserRating && (
            <InteractiveHoverButton onClick={openModal}>
              Rate
            </InteractiveHoverButton>
          )}
        </div>

        {displayedUserRating && (
          <div className="flex items-center gap-3">
            <StarsDisplay
              rating={displayedUserRating}
              halves={false}
              readOnly
              sizeClass="rating-sm"
              name="user-rating"
            />
            <div className="text-xs">
              You rated{" "}
              <span className="font-semibold">{displayedUserRating}</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* MODAL */}
      {modalOpen && (
        <div className="modal modal-open">
          <div
            className="modal-box bg-background text-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg">Rate this project</h3>

            <div className="py-4 flex justify-center">
              <StarsDisplay
                rating={selected ?? 0}
                halves={false}
                readOnly={false}
                sizeClass="rating-xl"
                name="modal-rating"
                onSelect={(v) => setSelected(v)}
              />
            </div>

            <div className="modal-action">
              <button className="btn btn-ghost rounded-xl" onClick={closeModal}>
                Cancel
              </button>
              <button
                className={`btn btn-primary rounded-xl ${
                  !selected ? "btn-disabled" : ""
                }`}
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Rating;
