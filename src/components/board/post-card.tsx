'use client'
import { PostListItem } from '@/types'
import { useRouter } from 'next/navigation'
interface PostCardProps {
  posts: PostListItem[] | null
}

export default function PostCard({ posts }: PostCardProps) {
  const router = useRouter()

  return (
    <div className="min-h-[580px] px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full table-fixed divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="w-1/12 py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    NO
                  </th>
                  <th
                    scope="col"
                    className="w-5/12 px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                  >
                    제목
                  </th>
                  <th
                    scope="col"
                    className="w-2/12 px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                  >
                    작성자
                  </th>
                  <th
                    scope="col"
                    className="w-2/12 px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                  >
                    작성일
                  </th>
                  <th
                    scope="col"
                    className="w-2/12 px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                  >
                    조회수
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {posts && posts.length > 0 ? (
                  posts.map((post) => (
                    <tr
                      key={post.id}
                      onClick={() => {
                        router.push(`/fan/board/${post.id}`)
                      }}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                        {post.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        {post.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        {post.author}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        {post.createdAt}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                        {post.viewCount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-8 text-center text-sm text-gray-500"
                    >
                      검색 내용에 관련한 게시글이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
