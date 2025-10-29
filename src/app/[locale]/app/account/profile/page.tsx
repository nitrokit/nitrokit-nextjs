import { ProfileInformation } from './components';

export default function Page() {
    return (
        <div className="mx-auto w-full space-y-6 px-4 sm:px-6 lg:max-w-4xl lg:px-8">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Profile Settings</h2>
                <p className="text-muted-foreground">
                    Manage your personal information and profile preferences.
                </p>
            </div>
            <ProfileInformation />
        </div>
    );
}
