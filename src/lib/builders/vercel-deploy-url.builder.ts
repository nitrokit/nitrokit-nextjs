/**
 * A builder class for creating Vercel deploy URLs with a fluent interface.
 * This makes constructing complex URLs with multiple parameters clean and readable.
 *
 * @see https://vercel.com/docs/deploy-button#generate-a-deploy-button
 */
export class VercelDeployUrlBuilder {
    private readonly baseUrl = 'https://vercel.com/new/clone';
    private params: Record<string, string | undefined> = {};

    /**
     * Sets the URL of the repository to be cloned.
     * @param url The full URL of the Git repository.
     */
    withRepositoryUrl(url: string): this {
        this.params['repository-url'] = url;
        return this;
    }

    /**
     * Sets the environment variables required for the project.
     * @param vars A list of environment variable names.
     */
    withEnv(...vars: string[]): this {
        this.params.env = vars.join(',');
        return this;
    }

    /**
     * Sets the name for the new Vercel project.
     * @param name The desired project name.
     */
    withProjectName(name: string): this {
        this.params['project-name'] = name;
        return this;
    }

    /**
     * Sets the name for the new repository if it's being created.
     * @param name The desired repository name.
     */
    withRepositoryName(name: string): this {
        this.params['repository-name'] = name;
        return this;
    }

    /**
     * Sets the title for the demo page on Vercel.
     * @param title The demo title.
     */
    withDemoTitle(title: string): this {
        this.params['demo-title'] = title;
        return this;
    }

    /**
     * Sets the description for the demo page on Vercel.
     * @param description The demo description.
     */
    withDemoDescription(description: string): this {
        this.params['demo-description'] = description;
        return this;
    }

    /**
     * Sets the URL for the "View Demo" button on Vercel.
     * @param url The URL of the live demo.
     */
    withDemoUrl(url: string): this {
        this.params['demo-url'] = url;
        return this;
    }

    /**
     * Sets the image for the demo page on Vercel.
     * @param url The URL of the demo image.
     */
    withDemoImage(url: string): this {
        this.params['demo-image'] = url;
        return this;
    }

    /**
     * Constructs the final Vercel deploy URL.
     * @returns The complete URL string with all parameters.
     */
    build(): string {
        const searchParams = new URLSearchParams(this.params as Record<string, string>);
        return `${this.baseUrl}?${searchParams.toString()}`;
    }
}
