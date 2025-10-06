/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { getBaseUrl } from '@/lib';

export function GET() {
    const baseUrl = getBaseUrl();
    const logoSize = 170;

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `url(${baseUrl}/images/backgrounds/patterns/geometry2.png)`
                }}
            >
                <div tw="flex">
                    <div tw="flex flex-col w-full py-12 px-4 md:items-center justify-between p-8 ">
                        <p>
                            <img
                                src={`${baseUrl}/images/logos/nitrokit.png`}
                                alt="Logo"
                                width={logoSize}
                                height={logoSize}
                                tw="rounded-full"
                                style={{
                                    borderRadius: '50%',
                                    width: `${logoSize}px`,
                                    height: `${logoSize}px`,
                                    objectFit: 'cover',
                                    marginBottom: '20px'
                                }}
                            />
                        </p>
                        <p tw="text-3xl font-bold text-gray-900">
                            <span className="font-extrabold text-red-600">
                                Give your projects a <span>rocket 🚀</span> start!
                            </span>
                        </p>
                        <p tw="text-3xl font-bold text-gray-900">
                            Save time with Nitrokit and focus on development...
                        </p>
                        <div tw="mt-12 flex text-3xl font-bold text-blue-600">www.nitrokit.tr</div>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630
        }
    );
}
