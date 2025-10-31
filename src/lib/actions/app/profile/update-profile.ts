'use server';

import 'server-only';
import { updateProfileFormSchema } from '@/lib';
import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/prisma';
import { SimpleTFunction } from '@/types/i18n';
import { getTranslations } from 'next-intl/server';

export type UpdateProfileActionState = {
    success?: boolean;
    errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        phone?: string[];
    };
    form?: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
    };
};

export async function updateProfileAction(
    prevState: UpdateProfileActionState,
    formData: FormData
): Promise<UpdateProfileActionState> {
    const session = await auth();
    if (!session?.user?.id) {
        return { errors: { firstName: ['Error'] } };
    }

    const data = Object.fromEntries(formData);
    const t = await getTranslations();
    const schema = updateProfileFormSchema(t as SimpleTFunction);
    const result = schema.safeParse(data);

    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors };
    }

    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            phone: result.data.phone
        }
    });

    return { success: true };
}
