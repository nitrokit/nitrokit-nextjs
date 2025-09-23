import { Badge } from '@/components/ui/badge';
import packageJson from '../../../package.json';

export function Version() {
    return (
        <Badge variant="outline" className="text-xs">
            v{packageJson.version}
        </Badge>
    );
}
