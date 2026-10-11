import Image from 'next/image';

interface AuthorAvatarProps {
  name: string;
  avatar: string | null;
  size: number;
}

// Falls back to initials when an author has no avatar
export default function AuthorAvatar({ name, avatar, size }: AuthorAvatarProps) {
  if (avatar) {
    return <Image src={avatar} alt="" width={size} height={size} className="shrink-0 rounded-full object-cover" />;
  }

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-full bg-navy-tint text-sm font-semibold text-navy"
    >
      {initials}
    </span>
  );
}
