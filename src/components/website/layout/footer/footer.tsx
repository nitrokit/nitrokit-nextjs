'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { Heart, Palette } from 'lucide-react';
import { CompactThemeSwitcher } from '@/components/switchers';
import { CopyRight, DevelopedBy, Logo, Version } from '@/components/shared';
import { SOCIAL_LINKS, FOOTER_LINKS } from '@/constants';
import { Separator } from '@radix-ui/themes';
import { CompactNewsletter } from '@/components/website/newsletter';
import { useTranslations } from 'next-intl';
import { FooterMenu } from '@/components/website/navigation';

export function Footer() {
    const t = useTranslations();

    return (
        <footer className="my-10 flex w-full flex-col items-center justify-center lg:mx-auto lg:w-7xl">
            <div className="relative">
                <section className="py-6">
                    <div className="grid gap-6 lg:grid-cols-7">
                        <div className="lg:col-span-3 lg:pr-20">
                            <Logo />
                            <p className="text-muted-foreground my-4 leading-relaxed">
                                {t('common.description')}
                            </p>

                            <div className="flex gap-2">
                                {SOCIAL_LINKS.map((social, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        size="icon"
                                        asChild
                                        className="hover:bg-primary hover:text-primary-foreground h-8 w-8 transition-colors"
                                    >
                                        <a
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.name}
                                        >
                                            <social.icon className="h-3 w-3" />
                                        </a>
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <FooterMenu
                            title={t('common.navigation.products')}
                            icon={Palette}
                            iconBgColor="bg-blue-500/10"
                            iconTextColor="text-blue-500"
                            links={FOOTER_LINKS.SECTION1}
                        />
                        <FooterMenu
                            title={t('common.navigation.support')}
                            icon={Heart}
                            iconBgColor="bg-green-500/10"
                            iconTextColor="text-green-500"
                            links={FOOTER_LINKS.SECTION2}
                        />
                        <div className="lg:col-span-2">
                            <CompactNewsletter />
                        </div>
                    </div>
                </section>
                <Separator />
                <section className="flex flex-col items-center justify-between gap-4 py-3 md:flex-row">
                    <div className="text-muted-foreground flex items-center gap-1 text-xs">
                        <CopyRight />
                    </div>

                    <div className="flex items-center gap-4">
                        <CompactThemeSwitcher />
                        <div className="bg-border h-4 w-px" />
                        <Version />
                        <div className="bg-border h-4 w-px" />
                        <DevelopedBy />
                    </div>
                </section>
            </div>
        </footer>
    );
}
