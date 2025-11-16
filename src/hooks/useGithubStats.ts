'use client';

import { getRepoStats } from '@nitrokit/core/actions/github';
import { useState, useEffect } from 'react';

interface GithubStats {
    stargazers_count: number;
    forks_count: number;
    license: string;
    release_url: string;
    version: string;
    isStatsLoading: boolean;
}

export function useGithubStats(): GithubStats {
    const [state, setState] = useState<GithubStats>({
        stargazers_count: 0,
        forks_count: 0,
        license: 'MIT License',
        release_url: '#',
        version: '1.0.0',
        isStatsLoading: true
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                const stats = await getRepoStats();
                setState({
                    stargazers_count: stats.stargazers_count,
                    forks_count: stats.forks_count,
                    license: stats.license ?? 'MIT License',
                    release_url: stats.release_url,
                    version: stats.version,
                    isStatsLoading: false
                });
            } catch (error) {
                console.error('Failed to fetch GitHub stats:', error);
                setState({
                    stargazers_count: 0,
                    forks_count: 0,
                    license: 'MIT License',
                    release_url: '#',
                    version: '1.0.0',
                    isStatsLoading: false
                });
            }
        }

        void fetchStats();
    }, []);

    return state;
}
