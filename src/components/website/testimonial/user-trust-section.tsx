import { cn } from '@nitrokit/core/lib';
import { AvatarGroup } from './avatar-group';
import { StarRating } from './star-rating';
import { Testimonial } from '@/types/testimonial';

interface UserTrustSectionProps {
    className?: string;
    testimonials: Testimonial[];
    label: string;
}

export function UserTrustSection({ className, testimonials, label }: UserTrustSectionProps) {
    const totalRating = testimonials.reduce((sum, current) => sum + current.rating, 0);
    const averageRating = Math.round(totalRating / testimonials.length);
    const usersForAvatarGroup = testimonials.map((testimonial) => ({
        id: testimonial.id,
        name: testimonial.author.name,
        title: testimonial.author.title,
        company: testimonial.author.company,
        avatarUrl: testimonial.author.avatar
    }));

    return (
        <div className={cn('flex flex-col items-center gap-2.5', className)}>
            <div className="flex gap-2.5">
                <AvatarGroup users={usersForAvatarGroup} />
                <StarRating rating={averageRating} />
            </div>
            <div className="text-muted-foreground text-center text-sm font-medium">{label}</div>
        </div>
    );
}
