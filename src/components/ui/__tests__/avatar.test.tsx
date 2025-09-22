import { render, screen } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';

describe('Avatar', () => {
    it('Avatar bileşeni ve fallback render ediliyor', () => {
        render(
            <Avatar data-testid="avatar-root">
                <AvatarImage src="/test.jpg" alt="Test User" data-testid="avatar-image" />
                <AvatarFallback data-testid="avatar-fallback">TU</AvatarFallback>
            </Avatar>
        );
        expect(screen.getByTestId('avatar-root')).toBeInTheDocument();
        // JSDOM ortamında görsel yüklenemediği için fallback gösterilmeli
        expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument();
    });

    it('AvatarFallback içeriği doğru gösteriliyor', () => {
        render(
            <Avatar>
                <AvatarFallback data-testid="avatar-fallback">AB</AvatarFallback>
            </Avatar>
        );
        expect(screen.getByTestId('avatar-fallback')).toHaveTextContent('AB');
    });
});
