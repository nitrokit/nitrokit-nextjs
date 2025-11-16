'use client';

import { getLatestVersion } from '@nitrokit/core/actions/github';
import { useEffect, useState } from 'react';

interface GithubReleaseState {
    version: string;
    release_url: string;
    isVersionLoading: boolean;
}

export function useGithubRelease(): GithubReleaseState {
    const [state, setState] = useState<GithubReleaseState>({
        version: 'v1.0.0',
        release_url: '',
        isVersionLoading: true
    });

    useEffect(() => {
        async function fetchVersion() {
            try {
                const latestVersion = await getLatestVersion();
                setState({
                    version: latestVersion.tag_name,
                    release_url: latestVersion.html_url,
                    isVersionLoading: false
                });
            } catch (error) {
                console.error('Failed to fetch GitHub version:', error);
                setState({ version: 'v1.0.0 (Error)', release_url: '', isVersionLoading: false });
            }
        }

        void fetchVersion();
    }, []);

    return state;
}
