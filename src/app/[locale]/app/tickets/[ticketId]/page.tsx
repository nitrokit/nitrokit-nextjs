'use client';

interface Props {
    params: {
        tickerId: string;
    };
}

export default function Page({ params }: Props) {
    const { tickerId } = params;

    return <>Page {tickerId}</>;
}
