import { DEFAULT_LANGUAGE } from '@/constants';
import { redirect } from 'next/navigation';

export default function RootPage() {
    redirect(`/${DEFAULT_LANGUAGE}`);
}
