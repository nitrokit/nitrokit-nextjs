'use server';

import { GitHubService } from '@/lib/services/github-service';
import { GitHubRelease, RepoStats } from '@/types/github';
import { env } from 'process';
import { cache } from 'react';

export async function getLatestVersion(): Promise<GitHubRelease> {
    const repoName = process.env.GH_REPONAME;
    if (!repoName) {
        console.warn('GH_REPONAME is not set.');
        return { tag_name: 'v1.0.0', name: null, html_url: '' };
    }

    try {
        const githubService = new GitHubService();
        const latestRelease = await githubService.getLatestRelease(repoName);
        return latestRelease ?? { tag_name: 'v1.0.0', name: null, html_url: '' };
    } catch (e) {
        console.error('GitHub API error:', e);
        return { tag_name: 'v1.0.0', name: null, html_url: '' };
    }
}

export const getRepoStats = cache(async (): Promise<RepoStats> => {
    const repoName = env.GH_REPONAME;
    if (!repoName) {
        console.warn(
            'GH_REPONAME is not set in environment variables. Falling back to default version.'
        );
        return {
            stargazers_count: 0,
            forks_count: 0,
            license: null,
            release_url: '#',
            version: '1.0.0'
        };
    }

    const githubService = new GitHubService();
    const [repo, latestRelease] = await Promise.all([
        githubService.getRepository(repoName),
        githubService.getLatestRelease(repoName)
    ]);

    return {
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        license: repo.license?.name ?? 'MIT License',
        release_url: latestRelease?.html_url ?? `${repo.html_url}/releases`,
        version: latestRelease?.tag_name?.replace('v', '') ?? '1.0.0'
    };
});
