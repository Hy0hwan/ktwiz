import EditPostForm from '@/components/board/edit-post-form'
import Breadcrumbs from '@/components/tailwind-ui/breadcrumbs/simple-with-chevrons'
import { fetchPostById } from '@/services/post-service'
import { notFound } from 'next/navigation'
export async function generateMetadata({
  params,
}: {
  params: {
    postId: number
  }
}) {
  const { postId } = params

  return {
    title: `게시판  ${postId} 수정 페이지 `,
    description: ` ${postId} 에 해당하는 게시판 수정 페이지입니다. 게시글을 수정해보세요!`,
  }
}
export default async function BoardEditPage({
  params,
}: {
  params: {
    postId: number
  }
}) {
  const { postId } = params

  const post = await fetchPostById(postId, 1)
  if (!post) {
    notFound()
  }
  return (
    <div className="flex w-full space-x-8 px-10 pb-16">
      <div className="mx-auto max-w-[1100px] flex-1">
        <div className="mt-[50px] flex w-full justify-end">
          <Breadcrumbs pages={['HOME', 'FAN', '팬 소통공간']} />
        </div>
        <EditPostForm post={post} />
      </div>
    </div>
  )
}
