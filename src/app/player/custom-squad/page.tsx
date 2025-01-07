'use client'

import { useEffect, useState, useRef } from 'react'
import { PlayerCode } from '@/types'
import Banner from '@/components/common/banner/banner'
import TabMenu from '@/components/common/tab-menu/tab-menu'
import { PLAYER_BANNER_DATA } from '@/contants/player'
import Image from 'next/image'
import { getPitcherPlayerList } from '@/app/api/player/api'

interface PlayerCard {
  pcode: PlayerCode
  playerName: string
  playerPrvwImg?: string
}

interface SquareStatus {
  playerName: string
  playerPrvwImg?: string
}

interface SquarePosition {
  top: string
  left: string
  status: SquareStatus
}

export default function CustomSquad() {
  const [cards, setCards] = useState<PlayerCard[]>([])
  const [draggedCard, setDraggedCard] = useState<PlayerCard | null>(null)
  const dragImageRef = useRef<HTMLDivElement | null>(null)

  const [squareStates, setSquareStates] = useState<SquarePosition[]>([
    { top: '78%', left: '48%', status: { playerName: '포수' } },
    { top: '68%', left: '58%', status: { playerName: '1루수' } },
    { top: '57%', left: '48%', status: { playerName: '2루수' } },
    { top: '68%', left: '37%', status: { playerName: '3루수' } },
    { top: '67%', left: '47%', status: { playerName: '투수' } },
    { top: '56%', left: '70%', status: { playerName: '외야수' } },
    { top: '50%', left: '20%', status: { playerName: '외야수' } },
    { top: '40%', left: '50%', status: { playerName: '외야수' } },
    { top: '56%', left: '34%', status: { playerName: '내야수' } },
  ])

  // 선수 전체 호출로 변경 필요
  useEffect(() => {
    const fetchPitcherPlayerList = async () => {
      try {
        const data = await getPitcherPlayerList()
        setCards(data)
      } catch (error) {
        console.error('fetchPitcherPlayerList 요청 실패:', error)
      }
    }
    fetchPitcherPlayerList()
  }, [])

  const handleDrag = (card: PlayerCard, e: React.DragEvent) => {
    setDraggedCard(card)

    if (dragImageRef.current) {
      const dragImage = dragImageRef.current
      dragImage.style.display = 'block'
      e.dataTransfer.setDragImage(dragImage, 104, 70)
    }
  }

  const handleDragEnd = () => {
    setDraggedCard(null)

    if (dragImageRef.current) {
      dragImageRef.current.style.display = 'none'
    }
  }

  const handleDrop = (index: number) => {
    if (draggedCard) {
      const updatedSquares = [...squareStates]
      updatedSquares[index].status = {
        playerName: draggedCard.playerName,
        playerPrvwImg: draggedCard.playerPrvwImg,
      }
      setSquareStates(updatedSquares)
      setDraggedCard(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <BannerTest />
      <div className="page-large">
        <div className="flex h-screen flex-col gap-6 md:flex-row">
          <div className="w-full flex-shrink-0 rounded-lg p-4 shadow-md md:w-1/5">
            <div className="flex max-h-screen flex-col gap-4 overflow-y-auto">
              {cards.map((card, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDrag(card, e)}
                  onDragEnd={handleDragEnd}
                  className="group relative flex h-60 w-full cursor-pointer items-center justify-center rounded-lg bg-gray-200 transition-all duration-300 hover:bg-gray-300 hover:shadow-md active:scale-95"
                >
                  <img
                    src={card.playerPrvwImg || '/images/ktwiz-basic-img.png'}
                    alt={card.playerName}
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {card.playerName}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-full w-full flex-grow rounded-lg p-4 shadow-md md:w-4/5">
            <Image
              src="/images/players/rb.png"
              alt="Player Image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg p-8"
            />
            <div className="absolute inset-0">
              {squareStates.map((position, index) => (
                <div
                  key={index}
                  onDrop={() => handleDrop(index)}
                  onDragOver={handleDragOver}
                  className="group absolute flex h-[104px] w-[70px] cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white bg-opacity-50 text-xs text-black"
                  style={{
                    top: position.top,
                    left: position.left,
                  }}
                >
                  {position.status.playerPrvwImg ? (
                    <img
                      src={position.status.playerPrvwImg}
                      alt={position.status.playerName}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  ) : (
                    position.status.playerName
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 드래그 이미지 */}
        <div
          ref={dragImageRef}
          className="pointer-events-none fixed h-[104px] w-[70px] overflow-hidden rounded-lg shadow-lg"
          style={{ display: 'none', zIndex: 1000 }}
        >
          {draggedCard && (
            <img
              src={draggedCard.playerPrvwImg}
              alt={draggedCard.playerName}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>
    </>
  )
}

const BannerTest = () => {
  return (
    <Banner>
      <Banner.Heading
        title="커스텀 스쿼드"
        subtitle="나만의 커스텀 스쿼드를 만들어 보세요!"
      />
      <TabMenu tabs={PLAYER_BANNER_DATA['/player'].tabs} />
    </Banner>
  )
}
