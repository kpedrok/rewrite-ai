import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  title: string
  src: string
  slug?: string
}

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-sm w-full aspect-video object-cover object-center		', {
        'hover:shadow-lg transition-shadow duration-200': slug,
      })}
      width={1300}
      height={730}
    />
  )
  return (
    <div className='sm:mx-0'>
      {slug ? (
        <Link as={`/blog/${slug}`} href='/blog/[slug]' aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
