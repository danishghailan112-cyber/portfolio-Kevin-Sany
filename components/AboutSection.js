import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-[65px] bg-[var(--color-bg)]"
    >
      <div className="mx-auto flex min-h-[calc(100dvh-65px)] max-w-6xl flex-col items-center gap-14 px-6 py-16 sm:px-10 sm:py-24 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-28">
        {/* Text column */}
        <div className="w-full max-w-xl text-center lg:text-left">
          <Reveal from="left">
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Photographer &amp; Videographer.
            </h1>
          </Reveal>

          <Reveal from="left" delay={0.1}>
            <p className="mt-6 text-base text-white/90 sm:text-lg">
              My name is Muhammad Kevin Sany
            </p>
          </Reveal>

          <Reveal from="left" delay={0.18}>
            <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
              Professional with strong experience in editing and content
              management. As a content editor, I have developed and executed
              effective content strategies for a variety of platforms and
              audiences, with more than three years of experience in this
              industry.
            </p>
          </Reveal>

          <Reveal from="left" delay={0.26}>
            <div className="mt-9 flex justify-center lg:justify-start">
              <a
                href="#portfolio"
                className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                View Portfolio
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Image column */}
        <Reveal from="right" delay={0.15} className="w-full max-w-sm lg:max-w-md">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/10 bg-[var(--color-bg-soft)] shadow-[0_0_60px_-15px_rgba(255,255,255,0.08)]">
            <Image
              src="/images/profile.jpg"
              alt="Portrait of Muhammad Kevin Sany"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
