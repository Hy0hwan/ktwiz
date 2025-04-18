'use client'

import { Video } from '@/types/media'
import Link from 'next/link'
import ClientImageFallback from '../common/client-image-fallback'

interface RelatedVideoListProps {
  videos: Video[]
}

export default function RelatedVideoList({ videos }: RelatedVideoListProps) {
  return (
    <div className="max-w-[1024px] lg:max-w-[550px]">
      <p className="my-2 font-semibold">하이라이트 영상 목록</p>
      <div>
        {videos.map(
          (video, index) =>
            video && (
              <Link
                key={index}
                href={`/media/highlight/${video.artcSeq}`}
                className="flex items-center space-x-4 py-2"
              >
                <div className="relative h-24 w-44 flex-shrink-0">
                  <ClientImageFallback
                    src={video.imgFilePath}
                    alt={`post-image-${video.artcTitle}`}
                    fallbackSrc="/images/fallback-img.png"
                    fill
                    className="rounded-xl object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="space-y-4 pr-2">
                  <p className="line-clamp-2 font-bold">{video.artcTitle}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <p>조회수 {video.viewCnt}회</p>
                    <span className="mx-2 text-gray-400">•</span>
                    <p>{new Date(video.regDttm).toLocaleDateString()}</p>
                  </div>
                </div>
              </Link>
            ),
        )}
      </div>
    </div>
  )
}
