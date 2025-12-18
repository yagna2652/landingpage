import Image from "next/image";

const integrations = [
  { name: "Claude", src: "/integrations/Claude_AI_symbol.svg" },
  { name: "ChatGPT", src: "/integrations/chatgpt-4.svg" },
  { name: "Cursor", src: "/integrations/cursor.png" },
  { name: "Slack", src: "/integrations/Slack_icon_2019.svg.png" },
  { name: "Raycast", src: "/integrations/raycast.png" },
  { name: "Linear", src: "/integrations/linear.jpeg" },
  { name: "Granola", src: "/integrations/granola.jpeg" },
  { name: "Fathom", src: "/integrations/fathom-video-scaled.webp" },
  { name: "OpenCode", src: "/integrations/opencode.avif" },
];

export function LogoSlider() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="font-serif text-4xl tracking-[-0.06em] text-black md:text-5xl">
            Work with your tools
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg tracking-[-0.04em] text-gray-600">
            Seamlessly integrates with the tools you already use
          </p>
        </div>

        {/* Infinite Logo Slider */}
        <div className="relative mt-12 overflow-hidden">
          {/* Left fade gradient */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#ece9e2] to-transparent" />

          {/* Right fade gradient */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#ece9e2] to-transparent" />

          <div className="flex animate-scroll gap-8">
            {/* First set of logos */}
            <div className="flex min-w-max gap-8">
              {integrations.map((integration) => (
                <div
                  key={`logo-${integration.name}`}
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm"
                >
                  <Image
                    src={integration.src}
                    alt={integration.name}
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                </div>
              ))}
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex min-w-max gap-8">
              {integrations.map((integration) => (
                <div
                  key={`logo-duplicate-${integration.name}`}
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm"
                >
                  <Image
                    src={integration.src}
                    alt={integration.name}
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}






