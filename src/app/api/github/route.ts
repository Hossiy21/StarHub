import { NextRequest, NextResponse } from 'next/server';
import { GithubRepo, GithubUser } from '@/types/github';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json(
            { error: 'Username is required' },
            { status: 400 }
        );
    }

    try {
        // Fetch user data first to verify existence
        const userRes = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                ...(process.env.GITHUB_TOKEN && {
                    'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
                })
            },
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!userRes.ok) {
            if (userRes.status === 404) {
                return NextResponse.json(
                    { error: 'User not found in GitHub registry.' },
                    { status: 404 }
                );
            }
            if (userRes.status === 403) {
                return NextResponse.json(
                    { error: 'GitHub API rate limit reached. Try again later.' },
                    { status: 429 }
                );
            }
            return NextResponse.json(
                { error: 'Failed to fetch user data from GitHub.' },
                { status: userRes.status }
            );
        }

        const user: GithubUser = await userRes.json();

        // Fetch ALL starred repositories
        let allRepos: GithubRepo[] = [];
        let page = 1;
        const perPage = 100;
        let lastResponse: Response | null = null;

        while (true) {
            const starsRes = await fetch(
                `https://api.github.com/users/${username}/starred?per_page=${perPage}&page=${page}&sort=created&direction=desc`,
                {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json',
                        ...(process.env.GITHUB_TOKEN && {
                            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
                        })
                    },
                    next: { revalidate: 300 }
                }
            );

            lastResponse = starsRes;

            if (!starsRes.ok) {
                // If we have some repos, return them with a partial warning, otherwise error
                if (allRepos.length > 0) break;

                return NextResponse.json(
                    { error: 'Failed to retrieve star history.' },
                    { status: starsRes.status }
                );
            }

            const pageRepos: GithubRepo[] = await starsRes.json();
            if (pageRepos.length === 0) break;

            allRepos = [...allRepos, ...pageRepos];

            // If we got less than perPage, we're on the last page
            if (pageRepos.length < perPage) break;

            // Safety break 
            if (page >= 30) break;

            page++;
        }

        const repos = allRepos;

        // Calculate stats
        const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const langCounts: Record<string, number> = {};
        repos.forEach(repo => {
            if (repo.language) {
                langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
            }
        });
        const mostUsedLanguage = Object.entries(langCounts)
            .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

        // Extract rate limit from the last request
        const finalRes = lastResponse || userRes;
        const rateLimit = {
            limit: parseInt(finalRes.headers.get('x-ratelimit-limit') || '60', 10),
            remaining: parseInt(finalRes.headers.get('x-ratelimit-remaining') || '0', 10),
            reset: parseInt(finalRes.headers.get('x-ratelimit-reset') || '0', 10),
            used: parseInt(finalRes.headers.get('x-ratelimit-used') || '0', 10)
        };

        return NextResponse.json({
            username,
            user,
            repos,
            totalStars,
            mostUsedLanguage,
            rateLimit
        });

    } catch (error) {
        console.error('GitHub API error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred while fetching GitHub data.' },
            { status: 500 }
        );
    }
}
