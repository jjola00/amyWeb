import { SVGProps } from "react";
import Image from "next/image";

export const EtsyIcon = ({ className }: IconProps) => (
    <Image
        src="/images/etsy.png"
        alt="Etsy"
        width={64}
        height={64}
        className={`object-contain ${className}`}
    />
);



interface IconProps {
    className?: string;
}

export const LinktreeIcon = ({ className }: IconProps) => (
    <Image
        src="/images/linktree.webp"
        alt="Linktree"
        width={24}
        height={24}
        className={className}
    />
);

export const TumblrIcon = ({ className }: IconProps) => (
    <Image
        src="/images/tumblr.png"
        alt="Tumblr"
        width={32}
        height={32}
        className={`object-contain ${className}`}
    />
);

export const TikTokIcon = ({ className }: IconProps) => (
    <Image
        src="/images/tiktok.png"
        alt="TikTok"
        width={32}
        height={32}
        className={`object-contain ${className}`}
    />
);