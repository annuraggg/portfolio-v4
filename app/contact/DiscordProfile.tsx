// components/discord/DiscordProfile.tsx
import Image from "next/image";
import { BsCircleFill } from "react-icons/bs";
import { FaMoon, FaMinusCircle } from "react-icons/fa";

type DiscordData = {
  data: {
    kv: Record<string, unknown>;
    discord_user: {
      id: string;
      username: string;
      avatar: string;
      discriminator: string;
      clan: string | null;
      avatar_decoration_data: unknown | null;
      bot: boolean;
      global_name: string;
      primary_guild: string | null;
      display_name: string;
      public_flags: number;
    };
    activities: {
      id: string;
      name: string;
      type: number;
      state: string;
      created_at: number;
    }[];
    discord_status: "online" | "idle" | "dnd" | "offline";
    active_on_discord_web: boolean;
    active_on_discord_desktop: boolean;
    active_on_discord_mobile: boolean;
    listening_to_spotify: boolean;
    spotify: unknown | null;
  };
  success: boolean;
};

const statusIcon = (status: string) => {
  switch (status) {
    case "online":
      return <BsCircleFill className="text-green-500" />;
    case "idle":
      return <FaMoon className="text-yellow-500" />;
    case "dnd":
      return <FaMinusCircle className="text-red-500" />;
    default:
      return <BsCircleFill className="text-gray-500" />;
  }
};

async function getDiscordData(): Promise<DiscordData | null> {
  try {
    const res = await fetch(
      "https://api.lanyard.rest/v1/users/564130664643952690",
      {
        // Refresh server-side every 30s; tweak for your needs
        next: { revalidate: 30 },
      }
    );
    if (!res.ok) return null;
    return (await res.json()) as DiscordData;
  } catch {
    return null;
  }
}

export default async function DiscordProfile() {
  const discordData = await getDiscordData();

  if (!discordData || !discordData.success) {
    return (
      <div className="text-white bg-black/40 rounded-lg p-4 w-full max-w-[400px] text-center">
        Loading Discord…
      </div>
    );
  }

  const user = discordData.data.discord_user;
  const status = discordData.data.discord_status || "offline";
  const customStatus = discordData.data.activities.find(
    (a) => a.type === 4
  )?.state;

  return (
    <a
      href={`https://discordapp.com/users/${user.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex border-1 dark:border-4 items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg w-full max-w-[400px] hover:opacity-80"
    >
      <div className="relative">
        <Image
          src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
          alt={user.username}
          width={48}
          height={48}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center border-2 border-black rounded-full">
          {statusIcon(status)}
        </span>
      </div>
      <div>
        <div className="font-semibold text-base sm:text-lg">
          {user.display_name || user.username}
        </div>
        <div className="text-xs sm:text-sm text-gray-400">{customStatus || status}</div>
      </div>
    </a>
  );
}
