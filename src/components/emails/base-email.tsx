import { Html, Head, Preview, Body, Container, Section, Text, Img } from '@react-email/components';
import { getBaseUrl } from '@/lib';

interface BaseEmailProps {
    preview: string;
    headerTitle: string;
    headerGradient: string;
    children: React.ReactNode;
}

export function BaseEmail({ preview, headerTitle, headerGradient, children }: BaseEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>{preview}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={{ ...header, background: headerGradient }}>
                        <Img
                            src={`${getBaseUrl()}/images/logos/nitrokit.png`}
                            width="70"
                            height="70"
                            alt="Nitrokit"
                            style={logo}
                        />
                        <Text style={headerText}>{headerTitle}</Text>
                    </Section>

                    <Section style={content}>{children}</Section>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    maxWidth: '600px',
};

const header = {
    padding: '30px',
    textAlign: 'center' as const,
    borderRadius: '10px 10px 0 0',
};

const logo = {
    margin: '0 auto',
};

const headerText = {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '10px 0 0 0',
};

const content = {
    padding: '30px',
};

export const emailStyles = {
    greeting: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333333',
        margin: '0 0 20px 0',
    },
    paragraph: {
        fontSize: '16px',
        lineHeight: '26px',
        color: '#555555',
        margin: '0 0 20px 0',
    },
    buttonContainer: {
        textAlign: 'center' as const,
        margin: '30px 0',
    },
    button: {
        borderRadius: '5px',
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'bold',
        textDecoration: 'none',
        textAlign: 'center' as const,
        display: 'inline-block',
        padding: '15px 30px',
    },
    linkText: {
        fontSize: '14px',
        color: '#666666',
        margin: '20px 0 0 0',
    },
    link: {
        backgroundColor: '#e9ecef',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '14px',
        color: '#333333',
        wordBreak: 'break-all' as const,
        fontFamily: 'monospace',
    },
    hr: {
        borderColor: '#dee2e6',
        margin: '30px 0 20px 0',
    },
    footer: {
        fontSize: '12px',
        color: '#6c757d',
        margin: '0',
        lineHeight: '18px',
    },
};
