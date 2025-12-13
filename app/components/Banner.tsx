import Image from 'next/image'
import imageUrl from '@/public/jaitun.jpg';

export default function Banner() {
    return (
        <div className='flex justify-center'>
            <Image
                src={imageUrl}
                alt='image'
            />
        </div>
    )
}
