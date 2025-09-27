export interface TestimonialAuthor {
    name: string;
    title: string;
    company: string;
    avatar: string;
}

export interface Testimonial {
    id: string;
    content: string;
    author: TestimonialAuthor;
    rating: number;
}
