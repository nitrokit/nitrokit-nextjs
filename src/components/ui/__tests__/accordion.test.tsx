import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../accordion';

describe('Accordion', () => {
    it('renders accordion items', () => {
        render(
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Item 1</AccordionTrigger>
                    <AccordionContent>Content 1</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Item 2</AccordionTrigger>
                    <AccordionContent>Content 2</AccordionContent>
                </AccordionItem>
            </Accordion>
        );

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('expands and collapses accordion items', async () => {
        render(
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Item 1</AccordionTrigger>
                    <AccordionContent>Content 1</AccordionContent>
                </AccordionItem>
            </Accordion>
        );

        const trigger = screen.getByRole('button', { name: /item 1/i });
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();

        await userEvent.click(trigger);
        expect(screen.getByText('Content 1')).toBeInTheDocument();

        await userEvent.click(trigger);
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    it('handles multiple accordion items', async () => {
        render(
            <Accordion type="multiple">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Item 1</AccordionTrigger>
                    <AccordionContent>Content 1</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Item 2</AccordionTrigger>
                    <AccordionContent>Content 2</AccordionContent>
                </AccordionItem>
            </Accordion>
        );

        const trigger1 = screen.getByRole('button', { name: /item 1/i });
        const trigger2 = screen.getByRole('button', { name: /item 2/i });

        await userEvent.click(trigger1);
        await userEvent.click(trigger2);

        expect(screen.getByText('Content 1')).toBeInTheDocument();
        expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('applies custom className to accordion item', () => {
        render(
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="custom-class">
                    <AccordionTrigger>Item 1</AccordionTrigger>
                    <AccordionContent>Content 1</AccordionContent>
                </AccordionItem>
            </Accordion>
        );

        const item = screen.getByText('Item 1').closest('.border-b');
        expect(item).toHaveClass('custom-class');
    });

    it('handles disabled accordion item', () => {
        render(
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1" disabled>
                    <AccordionTrigger>Item 1</AccordionTrigger>
                    <AccordionContent>Content 1</AccordionContent>
                </AccordionItem>
            </Accordion>
        );

        const trigger = screen.getByRole('button', { name: /item 1/i });
        expect(trigger).toBeDisabled();
    });
});
