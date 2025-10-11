'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

import {
    Badge,
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Textarea
} from '@/components/ui';
import {
    sendContactEmail,
    EmailServiceResult,
    contactFormSchema,
    type ContactFormData,
    cn
} from '@/lib';
import { Link } from '@/lib/i18n/navigation';

type FormStatus = 'idle' | 'success' | 'error';

export const ContactForm = () => {
    const t = useTranslations();
    const simpleT = (key: string) => t(key as any);
    const [isPending, startTransition] = useTransition();
    const [formStatus, setFormStatus] = useState<FormStatus>('idle');

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema(simpleT)),
        defaultValues: {
            name: '',
            email: '',
            message: ''
        },
        mode: 'onBlur'
    });

    const {
        formState: { isSubmitting, errors, isValid, touchedFields }
    } = form;

    const handleFormSubmit: SubmitHandler<ContactFormData> = (data) => {
        startTransition(async () => {
            setFormStatus('idle');
            try {
                const result: EmailServiceResult = await sendContactEmail(data);
                console.log(result);
                if (!result.success) {
                    setFormStatus('error');
                    toast.error(t('app.errors.general'), {
                        icon: <AlertCircle className="h-4 w-4" />
                    });
                }

                setFormStatus('success');
                toast.success(t('contact.message_sent'), {
                    icon: <CheckCircle className="h-4 w-4" />,
                    description: t('contact.message_sent_description')
                });
                form.reset();
                setFormStatus('idle');
            } catch (error) {
                console.error(error);
                setFormStatus('error');
                toast.error(t('app.errors.general'), {
                    icon: <AlertCircle className="h-4 w-4" />
                });
            } finally {
            }
        });
    };

    const isLoading = isSubmitting || isPending;

    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{t('contact.form_heading')}</h2>
                    {formStatus === 'success' && (
                        <Badge
                            variant="secondary"
                            className="border-green-200 bg-green-50 text-green-700"
                        >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            {t('contact.message_sent')}
                        </Badge>
                    )}
                </div>
                <p className="text-muted-foreground">{t('contact.form_description')}</p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={(event) => {
                        void form.handleSubmit(handleFormSubmit)(event);
                    }}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium">
                                        {t('contact.name')}
                                        <span className="text-destructive ml-1">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            autoComplete="name"
                                            className={cn(
                                                'bg-background border-border focus:border-primary h-12 transition-all duration-200',
                                                errors.name &&
                                                    'border-destructive focus-visible:ring-destructive',
                                                touchedFields.name &&
                                                    !errors.name &&
                                                    'border-green-500'
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-sm font-medium">
                                        {t('contact.email')}
                                        <span className="text-destructive ml-1">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            autoComplete="email"
                                            className={cn(
                                                'bg-background border-border focus:border-primary h-12 transition-all duration-200',
                                                errors.email &&
                                                    'border-destructive focus-visible:ring-destructive',
                                                touchedFields.email &&
                                                    !errors.email &&
                                                    'border-green-500'
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-medium">
                                    {t('contact.message')}
                                    <span className="text-destructive ml-1">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        rows={6}
                                        className={cn(
                                            'bg-background border-border focus:border-primary resize-none transition-all duration-200',
                                            errors.message &&
                                                'border-destructive focus-visible:ring-destructive',
                                            touchedFields.message &&
                                                !errors.message &&
                                                'border-green-500'
                                        )}
                                        {...field}
                                    />
                                </FormControl>
                                <div className="flex items-center justify-between">
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />

                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={isLoading || !isValid}
                            size="lg"
                            className={cn(
                                'h-12 w-full transition-all duration-200',
                                formStatus === 'success' && 'bg-green-600 hover:bg-green-700',
                                isLoading && 'cursor-not-allowed'
                            )}
                        >
                            {isLoading ? (
                                <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    {t('contact.send')}...
                                </>
                            ) : formStatus === 'success' ? (
                                <>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    {t('contact.send')}
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    {t('contact.send')}
                                </>
                            )}
                        </Button>

                        <p className="text-muted-foreground mt-4 text-center text-xs">
                            {t.rich('contact.privacy_policy_agreement', {
                                a: (children) => (
                                    <Link
                                        href="/privacy"
                                        target="_blank"
                                        className="hover:text-foreground underline transition-colors"
                                    >
                                        {children}
                                    </Link>
                                )
                            })}
                        </p>
                    </div>
                </form>
            </Form>
        </div>
    );
};
