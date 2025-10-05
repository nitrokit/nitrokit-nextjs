import { render, screen } from '@testing-library/react';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '../breadcrumb';

describe('Breadcrumb', () => {
    it('renders breadcrumb with items', () => {
        render(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/about">About</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Current Page</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );

        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Current Page')).toBeInTheDocument();
    });

    it('renders breadcrumb links with correct hrefs', () => {
        render(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/about">About</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );

        const homeLink = screen.getByRole('link', { name: /home/i });
        const aboutLink = screen.getByRole('link', { name: /about/i });

        expect(homeLink).toHaveAttribute('href', '/');
        expect(aboutLink).toHaveAttribute('href', '/about');
    });

    it('applies custom className to breadcrumb list', () => {
        render(
            <Breadcrumb>
                <BreadcrumbList className="custom-class">
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );

        const list = screen.getByRole('list');
        expect(list).toHaveClass('custom-class');
    });

    it('renders breadcrumb with custom separator', () => {
        render(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="custom-separator">/</BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Current Page</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );

        const separator = screen.getByText('/');
        expect(separator).toHaveClass('custom-separator');
    });
});
