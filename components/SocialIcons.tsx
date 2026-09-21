import { getSiteSettings } from "@/lib/data";

type Settings = NonNullable<Awaited<ReturnType<typeof getSiteSettings>>>;

const ICON_PROPS = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "currentColor" } as const;

const PLATFORMS: {
  key: keyof Settings;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "facebookUrl",
    label: "Facebook",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
      </svg>
    ),
  },
  {
    key: "twitterUrl",
    label: "X",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.3l8.1-9.3L1 2h7.2l5 6.6L18.9 2Zm-1.2 18h1.7L7.4 4H5.6l12.1 16Z" />
      </svg>
    ),
  },
  {
    key: "instagramUrl",
    label: "Instagram",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 2 .3 2.5.5.6.2 1.1.6 1.6 1.1.5.5.8.9 1.1 1.6.2.5.4 1.3.5 2.5.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 2-.5 2.5-.2.6-.6 1.1-1.1 1.6-.5.5-.9.8-1.6 1.1-.5.2-1.3.4-2.5.5-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-2-.3-2.5-.5-.6-.2-1.1-.6-1.6-1.1-.5-.5-.8-.9-1.1-1.6-.2-.5-.4-1.3-.5-2.5C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-2 .5-2.5.2-.6.6-1.1 1.1-1.6.5-.5.9-.8 1.6-1.1.5-.2 1.3-.4 2.5-.5C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-1 .1-1.6.2-2 .4-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.1.4-.3 1-.4 2C3 9.5 3 9.9 3 13s0 3.5.1 4.7c.1 1 .2 1.6.4 2 .2.5.4.8.8 1.2.4.4.7.6 1.2.8.4.1 1 .3 2 .4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1-.1 1.6-.2 2-.4.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.1-.4.3-1 .4-2 .1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1-.2-1.6-.4-2-.2-.5-.4-.8-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.1-1-.3-2-.4C15.5 4 15.1 4 12 4Zm0 3.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm4.8-2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
      </svg>
    ),
  },
  {
    key: "youtubeUrl",
    label: "YouTube",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M22.5 7.2a2.9 2.9 0 0 0-2-2C18.7 4.7 12 4.7 12 4.7s-6.7 0-8.5.5a2.9 2.9 0 0 0-2 2C1 9 1 12 1 12s0 3 .5 4.8a2.9 2.9 0 0 0 2 2c1.8.5 8.5.5 8.5.5s6.7 0 8.5-.5a2.9 2.9 0 0 0 2-2c.5-1.8.5-4.8.5-4.8s0-3-.5-4.8ZM9.7 15.5V8.5l6 3.5-6 3.5Z" />
      </svg>
    ),
  },
  {
    key: "tiktokUrl",
    label: "TikTok",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M16.6 2h-3.2v13.5a2.6 2.6 0 1 1-1.9-2.5V9.6a5.9 5.9 0 1 0 5.1 5.8V8.9a7.7 7.7 0 0 0 4.4 1.4V7.1a4.5 4.5 0 0 1-4.4-4.4V2Z" />
      </svg>
    ),
  },
];

export default async function SocialIcons({ className = "" }: { className?: string }) {
  const settings = await getSiteSettings();
  const active = PLATFORMS.filter((p) => settings?.[p.key]);

  if (active.length === 0) {
    return <p className="text-sm text-navy-dark/50">Coming soon.</p>;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {active.map((platform) => (
        <a
          key={String(platform.key)}
          href={settings![platform.key] as string}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={platform.label}
          title={platform.label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/20 text-navy transition hover:border-gold hover:bg-gold hover:text-white"
        >
          {platform.icon}
        </a>
      ))}
    </div>
  );
}
