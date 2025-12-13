import Image from 'next/image'
import imageUrl from '@/public/jaitun.jpg';

export default function Banner() {
    return (
        <div>
            <Image
                src={imageUrl}
                alt='image'
            />
        </div>
    )
}
