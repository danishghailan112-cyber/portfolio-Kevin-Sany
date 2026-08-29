"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Lightbox({ open, onClose, children, label }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white hover:bg-white hover:text-black sm:right-8 sm:top-8"
          >
            <span className="text-lg leading-none">✕</span>
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
