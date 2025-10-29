import { Badge } from '@/components/ui';
import packageJson from '../../../package.json';

export function Version() {
    return (
        <Badge variant="outline" className="cursor-default text-xs">
            v{packageJson.version}
        </Badge>
    );
}
