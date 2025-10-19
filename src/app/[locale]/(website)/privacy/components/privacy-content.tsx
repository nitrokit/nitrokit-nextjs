import { getTranslations } from 'next-intl/server';

type SectionContent = string | string[];

const renderRichText = (text: string) => {
    let htmlContent = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    htmlContent = htmlContent.replace(
        /<policyUrl>(.*?)<\/policyUrl>/g,
        `<a href="/privacy-policy" class="font-medium text-blue-600 hover:underline">$1</a>`
    );
    htmlContent = htmlContent.replace(
        /<email>(.*?)<\/email>/g,
        `<a href="mailto:$1" class="font-medium text-blue-600 hover:underline">$1</a>`
    );
    return <span dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

const renderList = (list: string[]) => {
    return (
        <ul className="list-disc space-y-2 pl-5 text-gray-600 dark:text-gray-400">
            {list.map((item, idx) => (
                <li key={idx}>{item}</li>
            ))}
        </ul>
    );
};

const sectionKeys = ['whatData', 'howWeUse', 'dataSharing', 'contactInfo'];

export async function PrivacyComponent() {
    const t = await getTranslations('app.privacyPolicy');
    return (
        <>
            {sectionKeys.map((key, index) => {
                const titleKey = `sections.${key}.title`;
                const contentKey = `sections.${key}.content`;

                const content = t.raw(contentKey as any) as SectionContent | undefined;

                if (!content) return null;

                return (
                    <section key={key} className="break-words">
                        <h2 className="mt-6 mb-3 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                            {index + 1}. {t(titleKey as any)}
                        </h2>

                        {Array.isArray(content) ? renderList(content) : renderRichText(content)}
                    </section>
                );
            })}
        </>
    );
}
