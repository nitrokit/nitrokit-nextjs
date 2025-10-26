'use server';

import { GitHubService } from '@/lib/services/github-service';
import { GitHubRelease } from '@/types/github';

export async function getLatestVersion(): Promise<GitHubRelease> {
    const repoName = process.env.GITHUB_REPONAME;
    if (!repoName) {
        console.warn('GITHUB_REPONAME is not set.');
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
