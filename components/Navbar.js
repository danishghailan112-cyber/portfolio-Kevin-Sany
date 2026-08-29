"use client";

import { useEffect, useLayoutEffect, useState } from "react";

const LINKS = [
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight whichever section is crossing the middle band
  // of the viewport as the user scrolls through the single-page layout.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open — using a
  // position:fixed freeze (rather than plain overflow:hidden) because
  // toggling overflow:hidden on body while scrolled down snaps the page
  // back to the top on iOS Safari/WebKit. Freezing body at its current
  // offset and restoring scrollY on close avoids that jump entirely.
  // useLayoutEffect (not useEffect) so this always finishes before any
  // follow-up scrollIntoView from a menu link click (see handleNavClick).
  useLayoutEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.dataset.scrollY = String(scrollY);
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      const scrollY = Number(document.body.dataset.scrollY || 0);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      delete document.body.dataset.scrollY;
      // Instant, not smooth — this is restoring where the user already
      // was (closing the menu), not a navigation the smooth-scroll CSS
      // should animate.
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
    }
  }, [open]);

  // Mobile menu links: close the menu (unfreezing body / restoring the
  // pre-open scroll position), then—once that's settled—smoothly scroll
  // to the chosen section. Doing this explicitly (rather than letting the
  // browser's native anchor-jump race against the unfreeze) guarantees the
  // page ends up at the section the user tapped, not back where it was.
  const handleMobileNavClick = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => {
      // Instant rather than smooth: smooth-scrollIntoView proved unreliable
      // over long distances (wouldn't always fully reach the target), and
      // an instant jump right after the menu closes still reads as one
      // clean, immediate motion to the user.
      document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
      if (typeof window !== "undefined" && window.history?.pushState) {
        window.history.pushState(null, "", `#${id}`);
      }
    }, 0);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "bg-black/85 backdrop-blur-md border-white/10"
          : "bg-black border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a
          href="#about"
          className="font-[family-name:var(--font-display)] text-lg md:text-[2em] font-bold tracking-tight text-white"
        >
          SanyVisual
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 text-sm sm:flex">
          {LINKS.map((link) => {
            const active = activeId === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`relative pb-1 transition-colors ${
                    active
                      ? "text-white underline underline-offset-4"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] sm:hidden"
        >
          <span
            className={`h-[1.5px] w-6 bg-white transition-transform duration-300 ${
              open ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-6 bg-white transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-[1.5px] w-6 bg-white transition-transform duration-300 ${
              open ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu panel — absolutely positioned (not in normal flow) so
          its open/close height animation can never push, reflow, or
          trigger scroll-anchoring against the rest of the page. */}
      <div
        className={`absolute left-0 right-0 top-full overflow-hidden bg-black transition-[max-height,opacity] duration-300 ease-in-out sm:hidden ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 border-t border-white/10 bg-black px-6 py-4">
          {LINKS.map((link) => {
            const active = activeId === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={handleMobileNavClick(link.id)}
                  className={`block rounded-md px-2 py-3 text-base transition-colors ${
                    active ? "text-white underline underline-offset-4" : "text-white/70"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
