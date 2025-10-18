import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

type RichTextValues = Record<string, ReactNode | ((chunks: ReactNode) => ReactNode)>;
type InterpolationValues = Record<string, string | number>;

export const translateSafely = (t: ReturnType<typeof useTranslations>, key: string): string => {
    return t(key as any);
};

export const translateRichSafely = (
    t: ReturnType<typeof useTranslations>,
    key: string,
    values?: RichTextValues | InterpolationValues
): ReactNode => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return t.rich(key as any, values as any);
};
