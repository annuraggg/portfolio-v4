'use client';

import { Project } from '@/data/projects';
import ProjectRating from '@/components/ratings/ProjectRating';
import { useFeatureFlags } from '@/lib/config/configcat-provider';
import { FEATURE_FLAGS } from '@/lib/config/feature-flags';
import { useInView, motion } from 'motion/react';
import { useRef } from 'react';

interface Props {
  project: Project;
}

const Rating = ({ project }: Props) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });
  const { isFeatureEnabled, isLoading } = useFeatureFlags();

  // Don't show rating if feature is disabled
  if (!isLoading && !isFeatureEnabled(FEATURE_FLAGS.ENABLE_PROJECT_RATINGS)) {
    return null;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex justify-center py-8"
    >
      <div className="w-full max-w-2xl px-8">
        <ProjectRating projectId={project.id} />
      </div>
    </motion.div>
  );
};

export default Rating;
