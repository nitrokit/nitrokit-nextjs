import { DEFAULT_LANGUAGE } from '@/constants/locale';
import { redirect } from 'next/navigation';

export default async function RootPage() {
    redirect(`/${DEFAULT_LANGUAGE}`);
}
