import {
    GoogleIcon,
    FacebookIcon,
    TwitterIcon,
    GithubIcon,
    GitlabIcon,
    LinkedinIcon
} from '@/comp/icons/brands';

export type Provider =
    | 'google'
    | 'github'
    | 'gitlab'
    | 'apple'
    | 'instagram'
    | 'facebook'
    | 'twitter'
    | 'linkedin';

export interface ProviderConfig {
    id: Provider;
    name: string;
    logo: React.ComponentType<{ className?: string; color?: string }>;
}

export const providers: ProviderConfig[] = [
    {
        id: 'google',
        name: 'Google',
        logo: GoogleIcon
    },
    {
        id: 'facebook',
        name: 'Facebook',
        logo: FacebookIcon
    },
    {
        id: 'twitter',
        name: 'Twitter',
        logo: TwitterIcon
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        logo: LinkedinIcon
    },
    {
        id: 'github',
        name: 'GitHub',
        logo: GithubIcon
    },
    {
        id: 'gitlab',
        name: 'GitLab',
        logo: GitlabIcon
    }
];
