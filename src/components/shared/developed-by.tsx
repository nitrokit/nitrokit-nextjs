import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui';

export function DevelopedBy() {
    return (
        <div className="rounded-sm py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
            <Tooltip>
                <TooltipTrigger>
                    <a
                        href="http://ekipisi.com"
                        target="_ekipisi_"
                        className="group relative flex items-center justify-center gap-1 transition-all duration-300 ease-in-out"
                    >
                        <div className="group-hover:text-[#2A72DF] group-hover:underline group-hover:underline-offset-4">
                            Developed by
                        </div>
                        <Image
                            src={'/images/logos/ekipisi.svg'}
                            alt="Ekipişi"
                            width={16}
                            height={16}
                            className="drop-shadow-sm transition duration-300 ease-in-out group-hover:animate-spin dark:drop-shadow-md"
                        />
                    </a>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Design and Developed by Ekipişi</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
