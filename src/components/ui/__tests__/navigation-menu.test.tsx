import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from '../navigation-menu';

describe('NavigationMenu', () => {
    it('renders navigation menu with items', () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/test" className={navigationMenuTriggerStyle()}>
                            Test Link
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );

        const link = screen.getByRole('link', { name: /test link/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/test');
    });

    it('renders navigation menu with trigger and content', async () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div>Test Content</div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );

        const trigger = screen.getByRole('button', { name: /components/i });
        expect(trigger).toBeInTheDocument();

        await userEvent.click(trigger);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies custom className to navigation menu link', () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/test" className="custom-class">
                            Test Link
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        );

        const link = screen.getByRole('link', { name: /test link/i });
        expect(link).toHaveClass('custom-class');
    });
});
