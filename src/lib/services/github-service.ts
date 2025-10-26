import type { GitHubRelease, GitHubRepository } from '@/types/github';

/**
 * Service class for interacting with the GitHub API.
 */
export class GitHubService {
    private readonly username: string;
    private readonly apiBaseUrl = 'https://api.github.com';
    private readonly headers: HeadersInit;

    /**
     * Initializes the GitHubService class.
     * If `username` or `token` are not provided, it falls back to environment variables.
     * @param username Optional The GitHub username.
     * @param token Optional GitHub Personal Access Token.
     *              Required to fetch private repositories and for a higher API rate limit.
     */
    constructor(username?: string, token?: string) {
        const finalUsername = username ?? process.env.GITHUB_USERNAME;
        if (!finalUsername) {
            throw new Error(
                'GitHub username is not provided and could not be found in environment variables.'
            );
        }
        this.username = finalUsername;

        const finalToken = token ?? process.env.GH_ACCESS_TOKEN;
        this.headers = {
            Accept: 'application/vnd.github.v3+json',
            'X-GitHub-Api-Version': '2022-11-28'
        };

        if (finalToken) {
            this.headers['Authorization'] = `Bearer ${finalToken}`;
        }
    }

    /**
     * Fetches all public and (if a token is provided) private repositories for the specified user.
     * It uses the API's pagination feature to collect all results into a single list.
     * @returns A list of all repositories for the user.
     */
    public async getAllRepositories(): Promise<GitHubRepository[]> {
        let allRepositories: GitHubRepository[] = [];
        let page = 1;
        const perPage = 100; // Maximum number of repos per page

        try {
            while (true) {
                const url = `${this.apiBaseUrl}/users/${this.username}/repos?page=${page}&per_page=${perPage}&sort=pushed`;
                const response = await fetch(url, { headers: this.headers });

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch data from GitHub API. Status: ${response.status} - ${response.statusText}`
                    );
                }

                const data: GitHubRepository[] = await response.json();

                if (data.length === 0) {
                    // If there are no more repositories, break the loop
                    break;
                }

                allRepositories = allRepositories.concat(data);
                page++;
            }
            return allRepositories;
        } catch (error) {
            console.error('An error occurred while fetching GitHub repositories:', error);
            throw error;
        }
    }

    /**
     * Fetches the details of a specific repository.
     * @param repoName The name of the repository.
     * @returns An object containing the repository details.
     */
    public async getRepository(repoName: string): Promise<GitHubRepository> {
        if (!repoName) {
            throw new Error('Repository name cannot be empty.');
        }

        try {
            const url = `${this.apiBaseUrl}/repos/${this.username}/${repoName}`;
            const response = await fetch(url, { headers: this.headers });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Repository named '${repoName}' not found.`);
                }
                throw new Error(
                    `Failed to fetch data from GitHub API. Status: ${response.status} - ${response.statusText}`
                );
            }

            const repository: GitHubRepository = await response.json();
            return repository;
        } catch (error) {
            console.error(`An error occurred while fetching the '${repoName}' repository:`, error);
            throw error;
        }
    }

    /**
     * Fetches the latest release for a specific repository.
     * @param repoName The name of the repository.
     * @returns An object containing the latest release details.
     */
    public async getLatestRelease(repoName: string): Promise<GitHubRelease | null> {
        if (!repoName) {
            throw new Error('Repository name cannot be empty.');
        }

        try {
            const url = `${this.apiBaseUrl}/repos/${this.username}/${repoName}/releases/latest`;
            const response = await fetch(url, {
                headers: this.headers,
                // Revalidate data every hour to avoid hitting API limits frequently
                next: { revalidate: 3600 }
            });

            if (!response.ok) {
                if (response.status === 404) {
                    // It's common for a repo to not have releases, so we return null instead of throwing an error.
                    console.warn(`No releases found for repository '${repoName}'.`);
                    return null;
                }
                throw new Error(
                    `Failed to fetch latest release. Status: ${response.status} - ${response.statusText}`
                );
            }
            return response.json() as Promise<GitHubRelease>;
        } catch (error) {
            console.error(
                `An error occurred while fetching the latest release for '${repoName}':`,
                error
            );
            return null; // Return null on error to prevent the page from crashing.
        }
    }
}
