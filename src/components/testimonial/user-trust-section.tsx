import { AvatarGroup } from './avatar-group';
import { StarRating } from './star-rating';
import { Testimonial } from '@/types/testimonial';

interface UserTrustSectionProps {
    testimonials: Testimonial[];
    label: string;
}

export function UserTrustSection({ testimonials, label }: UserTrustSectionProps) {
    const totalRating = testimonials.reduce((sum, current) => sum + current.rating, 0);
    const averageRating = Math.round(totalRating / testimonials.length);
    const usersForAvatarGroup = testimonials.map((testimonial) => ({
        id: testimonial.id,
        name: testimonial.author.name,
        title: testimonial.author.title,
        company: testimonial.author.company,
        avatarUrl: testimonial.author.avatar,
    }));

    return (
        <div className="mb-10 flex flex-col items-center gap-2.5">
            <div className="flex gap-2.5">
                <AvatarGroup users={usersForAvatarGroup} />
                <StarRating rating={averageRating} />
            </div>
            <div className="text-muted-foreground text-center text-sm font-medium">{label}</div>
        </div>
    );
}
