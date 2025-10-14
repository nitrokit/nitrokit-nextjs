import { Badge } from '@/comp/ui';
import packageJson from '../../../package.json';

export function Version() {
    return (
        <Badge variant="outline" className="text-xs">
            v{packageJson.version}
        </Badge>
    );
}
