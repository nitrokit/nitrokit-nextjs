'use client';

interface Props {
    params: {
        invoiceId: string;
    };
}

export default function Page({ params }: Props) {
    const { invoiceId } = params;

    return <>Page {invoiceId}</>;
}
