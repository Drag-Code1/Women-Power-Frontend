// components/artist/ArtistAvatar.tsx
import { User } from 'lucide-react';
import { getInitials } from '@/app/lib/utils/dashboardartist-utils';

interface ArtistAvatarProps {
  image?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ArtistAvatar({ image, name, size = 'md' }: ArtistAvatarProps) {
  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-32 w-32',
    lg: 'h-40 w-40'
  };

  const iconSizes = {
    sm: 16,
    md: 48,
    lg: 64
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-blue-100 flex items-center justify-center`}>
      {image ? (
        <img 
          src={image} 
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        <User size={iconSizes[size]} className="text-blue-600" />
      )}
    </div>
  );
}