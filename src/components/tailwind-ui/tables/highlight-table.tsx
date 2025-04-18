import { cn } from '@/utils'

export function HighlightTable<T extends Record<string, any>>({
  data,
  thKey,
  highlightRowKey,
  rowKeyName = 'key',
  highlightColumnKey,
}: {
  data: T[]
  thKey: { title: string; key: keyof T }[]
  highlightRowKey?: string
  rowKeyName?: string
  highlightColumnKey?: string
}) {
  const getRowStyle = (idx: number, player: any) => {
    if (highlightRowKey && player[rowKeyName] === highlightRowKey) {
      return 'bg-red-50 text-[--main-red-color]'
    }
    return 'bg-white text-gray-400'
  }

  const getStripeStyle = (idx: number) => {
    return idx % 2 === 0 ? 'bg-gray-50' : 'bg-white' // 기본 줄무늬 (짝수는 연한 핑크색, 홀수는 흰색)
  }
  const getHighlightStyle = (idx: number) => {
    return higlightColumIndex === idx ? 'bg-red-50' : ''
  }
  const higlightColumIndex = highlightColumnKey
    ? thKey.findIndex((th) => th.key === highlightColumnKey)
    : -1
  return (
    <div className="">
      <div className="mt-2 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300 border-t-2 border-gray-700">
              <thead>
                <tr className="divide-x divide-gray-200">
                  {thKey.map((th, idx) => {
                    return (
                      <th
                        key={idx + 'thkey'}
                        scope="col"
                        className={`border-none px-4 py-3.5 text-left text-xs font-semibold text-gray-900 ${higlightColumIndex === idx ? 'bg-red-50' : 'bg-white'}`}
                      >
                        {th.title}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((player, idx) => {
                  const rowStyle = highlightRowKey
                    ? getRowStyle(idx, player)
                    : getStripeStyle(idx)

                  return (
                    <tr
                      key={`data ${idx}`}
                      className={`divide-x divide-gray-200 hover:bg-red-50 hover:text-gray-600 ${rowStyle} `}
                    >
                      {thKey.map((th, index) => {
                        // const isSameKey = !player[th.key as keyof T]
                        const columStyle = getHighlightStyle(index)
                        return (
                          <td
                            key={index + 'key'}
                            className={cn(
                              `${index === 0 ? `pl-3 text-start` : `px-4 text-center`} whitespace-nowrap border-none py-4 text-xs font-normal ${columStyle}`,
                            )}
                          >
                            {player[th.key as keyof T]
                              ? player[th.key as keyof T]
                              : '-'}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
