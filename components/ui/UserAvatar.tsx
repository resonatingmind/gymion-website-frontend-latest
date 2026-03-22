"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  photoUrl?: string | null;
  /** Size in pixels — controls width, height, text size, and border-radius */
  size?: number;
  /** Extra Tailwind classes applied to the outer wrapper */
  className?: string;
  /** Theme variant: defaults to "violet" (light bg, dark text) 
   *  Use "dark" for the sidebar (dark bg, light text) */
  theme?: "violet" | "dark";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

const THEMES = {
  violet: "bg-violet-100 text-violet-700",
  dark:   "bg-violet-900/40 text-violet-300",
};

/**
 * UserAvatar
 * ----------
 * Shows a profile photo when `photoUrl` is provided and loads successfully.
 * Falls back to a styled initials badge otherwise.
 *
 * Usage:
 *   <UserAvatar name="Rahul Kumar" photoUrl={user.profilePhoto} size={36} />
 *   <UserAvatar name="Rahul Kumar" size={36} theme="dark" />
 */
export function UserAvatar({
  name,
  photoUrl,
  size = 36,
  className,
  theme = "violet",
}: UserAvatarProps) {
  const [imgError, setImgError] = useState(false);

  const showPhoto = !!photoUrl && !imgError;
  const initials  = getInitials(name);

  const style = { width: size, height: size, minWidth: size, minHeight: size };
  const textSize =
    size <= 28 ? "text-[10px]" :
    size <= 36 ? "text-xs"     :
    size <= 44 ? "text-sm"     : "text-base";

  return (
    <div
      style={style}
      className={cn(
        "relative shrink-0 overflow-hidden rounded-xl",
        !showPhoto && THEMES[theme],
        className
      )}
    >
      {showPhoto ? (
        <Image
          src={photoUrl}
          alt={name}
          fill
          sizes={`${size}px`}
          className="object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span
          className={cn(
            "flex h-full w-full items-center justify-center font-bold leading-none",
            textSize
          )}
        >
          {initials}
        </span>
      )}
    </div>
  );
}
