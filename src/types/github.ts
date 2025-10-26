export interface GitHubRepository {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    owner: {
        login: string;
        avatar_url: string;
        html_url: string;
    };
    html_url: string;
    description: string | null;
    fork: boolean;
    url: string;
    homepage: string | null;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
    language: string | null;
    license: {
        key: string;
        name: string;
        spdx_id: string;
        url: string | null;
    } | null;
    topics: string[];
    visibility: 'public' | 'private' | 'internal';
    archived: boolean;
    disabled: boolean;
    pushed_at: string;
    created_at: string;
    updated_at: string;
}

export interface GitHubRelease {
    tag_name: string;
    name: string | null;
    html_url: string;
}
