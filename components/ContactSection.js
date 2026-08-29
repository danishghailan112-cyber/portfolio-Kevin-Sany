import Image from "next/image";
import Reveal from "@/components/Reveal";
import { contact } from "@/lib/data";

const ITEMS = [
  {
    key: "phone",
    icon: "/icons/call-white.png",
    ...contact.phone,
  },
  {
    key: "email",
    icon: "/icons/mail-white.png",
    ...contact.email,
  },
  {
    key: "instagram",
    icon: "/icons/instagram-white.png",
    ...contact.instagram,
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-[65px] flex min-h-[calc(100dvh-65px)] items-center bg-[var(--color-bg)]"
    >
      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <Reveal from="bottom" className="text-center">
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold text-white sm:text-5xl">
            Contact Us
          </h1>
        </Reveal>

        <Reveal from="bottom" delay={0.1} className="mt-6 text-center">
          <p className="text-lg font-medium text-white sm:text-xl">
            Need more information?
          </p>
          <p className="text-lg font-medium text-white sm:text-xl">
            Get in touch with us
          </p>
        </Reveal>

        <div className="mx-auto mt-12 flex max-w-sm flex-col gap-4">
          {ITEMS.map((item, i) => (
            <Reveal key={item.key} from="bottom" delay={0.18 + i * 0.08}>
              <a
                href={item.href}
                target={item.key === "instagram" ? "_blank" : undefined}
                rel={item.key === "instagram" ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-white/15 px-5 py-4 transition-colors hover:border-white/40 hover:bg-white/5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors group-hover:border-white">
                  <Image src={item.icon} alt="" width={18} height={18} />
                </span>
                <span className="text-base font-medium text-white sm:text-lg">
                  {item.display}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
