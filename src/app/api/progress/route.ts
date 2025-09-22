import { NextResponse } from 'next/server';

export async function GET() {
    console.log('=== Progress API Called ===');
    try {
        // GitHub API token (Projects API için gerekli)
        const token = process.env.GITHUB_TOKEN;
        console.log('GitHub token exists:', !!token);

        if (!token) {
            console.log('❌ GitHub token not found, using fallback data');
            const fallbackData = {
                percentage: 1,
                totalTasks: 0,
                completedTasks: 0,
                backlogTasks: 0,
                lastUpdated: new Date().toISOString(),
                source: 'fallback',
            };
            console.log('Returning fallback data:', fallbackData);
            return NextResponse.json(fallbackData);
        }

        // Organization project - URL'den: https://github.com/orgs/nitrokit/projects/1
        const orgName = 'nitrokit';
        const projectNumber = 1;

        // GraphQL query to get project data
        const graphqlQuery = {
            query: `
                query($orgName: String!, $projectNumber: Int!) {
                    organization(login: $orgName) {
                        projectV2(number: $projectNumber) {
                            title
                            items(first: 100) {
                                nodes {
                                    id
                                    fieldValueByName(name: "Status") {
                                        ... on ProjectV2ItemFieldSingleSelectValue {
                                            name
                                        }
                                    }
                                    content {
                                        ... on Issue {
                                            title
                                            state
                                        }
                                        ... on PullRequest {
                                            title
                                            state
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `,
            variables: {
                orgName,
                projectNumber,
            },
        };

        // GitHub GraphQL API call
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(graphqlQuery),
        });

        if (!response.ok) {
            console.error('GitHub API Error:', response.status, response.statusText);
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.errors) {
            console.error('GraphQL errors:', data.errors);
            throw new Error('GraphQL query failed');
        }

        const project = data.data?.organization?.projectV2;

        if (!project) {
            throw new Error('Project not found');
        }

        const items = project.items.nodes || [];

        // Status kolonlarını say (case-insensitive)
        let backlogTasks = 0;
        let doneTasks = 0;
        let inProgressTasks = 0;
        let todoTasks = 0;

        items.forEach((item: any) => {
            const status = item.fieldValueByName?.name?.toLowerCase() || '';

            if (status.includes('backlog')) {
                backlogTasks++;
            } else if (status.includes('done') || status.includes('complete')) {
                doneTasks++;
            } else if (
                status.includes('progress') ||
                status.includes('doing') ||
                status.includes('in progress')
            ) {
                inProgressTasks++;
            } else if (status.includes('todo') || status.includes('to do')) {
                todoTasks++;
            }
        });

        const totalTasks = backlogTasks + doneTasks + inProgressTasks + todoTasks;

        // Progress hesapla: Done / Total * 100
        let percentage = 0;

        if (totalTasks > 0) {
            percentage = Math.round((doneTasks / totalTasks) * 100);
            // Minimum %5, maksimum %95 arasında tut (sadece task varsa)
            percentage = Math.max(5, Math.min(95, percentage));
        }
        // Eğer hiç task yoksa %0 olsun

        console.log(
            `GitHub Projects progress: ${doneTasks}/${totalTasks} tasks done (${percentage}%)`
        );
        console.log(
            `Breakdown - Backlog: ${backlogTasks}, Todo: ${todoTasks}, In Progress: ${inProgressTasks}, Done: ${doneTasks}`
        );

        return NextResponse.json({
            percentage,
            totalTasks,
            completedTasks: doneTasks,
            backlogTasks,
            inProgressTasks,
            todoTasks,
            projectTitle: project.title,
            lastUpdated: new Date().toISOString(),
            source: 'github-projects',
        });
    } catch (error) {
        console.error('Progress API error:', error);

        // Hata durumunda fallback değerler
        return NextResponse.json({
            percentage: 1,
            totalTasks: 38,
            completedTasks: 31,
            backlogTasks: 7,
            lastUpdated: new Date().toISOString(),
            source: 'fallback',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}
