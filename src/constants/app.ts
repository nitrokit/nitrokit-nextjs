import {
    Facebook as IconFacebook,
    Instagram as IconInstagram,
    Linkedin as IconLinkedin,
    Github as IconGithub,
} from 'lucide-react';

const GITHUB_URL = 'https://github.com/nitrokit/nitrokit-nextjs';

const PUBLIC_EMAIL = 'hello@nitrokit.tr';

const SOCIAL_LINKS = [
    {
        name: 'instagram',
        url: 'https://www.instagram.com/nitrokittr',
        icon: IconInstagram,
    },
    {
        name: 'facebook',
        url: 'https://www.facebook.com/nitrokittr',
        icon: IconFacebook,
    },
    {
        name: 'linkedin',
        url: 'https://www.linkedin.com/company/nitrokit',
        icon: IconLinkedin,
    },
    {
        name: 'github',
        url: 'https://github.com/nitrokit',
        icon: IconGithub,
    },
];

const DEFAULT_CURRENCY = 'USD';

export { GITHUB_URL, PUBLIC_EMAIL, SOCIAL_LINKS, DEFAULT_CURRENCY };
