'use server';

import { updateProfileFormSchema } from '@/lib';
import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/prisma';

export type UpdateProfileActionState = {
    success?: boolean;
    errors?: {
        firstname?: string[];
        lastname?: string[];
        email?: string[];
    };
};

export async function updateProfileAction(
    prevState: UpdateProfileActionState,
    formData: FormData
): Promise<UpdateProfileActionState> {
    const session = await auth();
    if (!session?.user?.id) {
        return {};
    }

    const data = Object.fromEntries(formData);
    const schema = updateProfileFormSchema((key) => key);
    const result = schema.safeParse(data);

    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors };
    }

    await prisma.user.update({
        where: { id: session.user.id },
        data: { firstName: result.data.firstname, lastName: result.data.lastname }
    });

    return { success: true };
}
