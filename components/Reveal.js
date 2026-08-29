"use client";

import { motion } from "framer-motion";

/**
 * Reveal — fades and slides content into place as it enters the viewport.
 * `from` controls which direction the element travels in from, so the
 * animation direction matches where the element actually sits on the page.
 */
export default function Reveal({
  children,
  from = "bottom",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  amount = 0.2,
  as: Tag = "div",
}) {
  const offsets = {
    bottom: { y: 28, x: 0 },
    top: { y: -28, x: 0 },
    left: { y: 0, x: -32 },
    right: { y: 0, x: 32 },
    none: { y: 0, x: 0 },
  };

  const { x, y } = offsets[from] ?? offsets.bottom;

  const MotionTag = motion[Tag] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
