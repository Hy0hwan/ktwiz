'use client'
import { useEffect, useState, useRef } from 'react'
import { PlayerCode } from '@/types'
import Banner from '@/components/common/banner/banner'
import TabMenu from '@/components/common/tab-menu/tab-menu'
import { PLAYER_BANNER_DATA } from '@/contants/player'
import Image from 'next/image'
import {
  getCatcherPlayerList,
  getInfielderPlayerList,
  getOutfielderPlayerList,
  getPitcherPlayerList,
} from '@/app/api/player/api'
import OverlayGuide from '@/components/player/overlay-guide'
import PlayerList from '@/components/player/custom-squad/player-list'
import Breadcrumbs from '@/components/tailwind-ui/breadcrumbs/simple-with-chevrons'
import CustomSquadTable from '@/components/player/custom-squad/player-table'
import { toJpeg } from 'html-to-image'

import Title from '@/components/common/title/title'

interface PlayerCard {
  pcode: PlayerCode
  playerName: string
  playerPrvwImg?: string
  position?: string | undefined
}

interface SquareStatus {
  playerName: string
  playerPrvwImg?: string
  position?: string | undefined
  isDrop?: boolean
}

interface SquarePosition {
  top: string
  left: string
  status: SquareStatus
}

export default function CustomSquadPage() {
  const [cards, setCards] = useState<PlayerCard[]>([])
  const [draggedCard, setDraggedCard] = useState<PlayerCard | null>(null)
  const dragImageRef = useRef<HTMLDivElement | null>(null)
  const captureRef = useRef<HTMLDivElement | null>(null)
  const [showGuide, setShowGuide] = useState(false)

  const [squareStates, setSquareStates] = useState<SquarePosition[]>([
    {
      top: '78%',
      left: '48%',
      status: { playerName: '', position: '포수' },
    },
    {
      top: '68%',
      left: '58%',
      status: { playerName: '', position: '1루수' },
    },
    {
      top: '57%',
      left: '48%',
      status: { playerName: '', position: '2루수' },
    },
    {
      top: '68%',
      left: '37%',
      status: { playerName: '', position: '3루수' },
    },
    {
      top: '67%',
      left: '47%',
      status: { playerName: '', position: '투수' },
    },
    {
      top: '56%',
      left: '70%',
      status: { playerName: '', position: '외야수' },
    },
    {
      top: '50%',
      left: '20%',
      status: { playerName: '', position: '외야수' },
    },
    {
      top: '40%',
      left: '50%',
      status: { playerName: '', position: '외야수' },
    },
    {
      top: '56%',
      left: '34%',
      status: { playerName: '', position: '내야수' },
    },
  ])
  const [bgSrc, setBgSrc] = useState('/images/players/rb.png')

  useEffect(() => {
    const now = new Date().getTime()
    const guideTime = localStorage.getItem('guideTime')

    if (!guideTime || now - parseInt(guideTime, 10) > 10 * 60 * 1000) {
      setShowGuide(true)
    }
  }, [])

  const handleCloseGuide = () => {
    setShowGuide(false)

    const now = new Date().getTime()
    localStorage.setItem('guideTime', now.toString())
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  useEffect(() => {
    const fetchPlayerList = async () => {
      try {
        const [
          pitcherPlayer,
          infielderPlayer,
          catcherPlayer,
          outfielderPlayer,
        ] = await Promise.all([
          getOutfielderPlayerList(),
          getInfielderPlayerList(),
          getPitcherPlayerList(),
          getCatcherPlayerList(),
        ])

        setCards([
          ...(pitcherPlayer as PlayerCard[]),
          ...(infielderPlayer as PlayerCard[]),
          ...(catcherPlayer as PlayerCard[]),
          ...(outfielderPlayer as PlayerCard[]),
        ])
      } catch (error) {
        console.error('fetchPlayerList 요청 실패:', error)
      }
    }
    fetchPlayerList()
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
      console.log('상태 종료 : ', dragImageRef.current)
      dragImageRef.current.style.display = 'none'
    }
  }

  const handleDrop = (index: number) => {
    if (draggedCard) {
      const updatedSquares = [...squareStates]

      if (updatedSquares[index].status.isDrop) {
        return
      }

      updatedSquares[index].status = {
        playerName: draggedCard.playerName,
        playerPrvwImg: draggedCard.playerPrvwImg,
        position: draggedCard.position,
        isDrop: true,
      }

      setSquareStates(updatedSquares)

      setCards((prevCards) =>
        prevCards.filter((card) => card.pcode !== draggedCard.pcode),
      )

      setDraggedCard(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => e.preventDefault()

  const handleCapture = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (captureRef.current) {
      try {
        // DOM을 PNG 이미지로 변환
        const dataUrl = await toJpeg(captureRef.current, {
          backgroundColor: 'white',
          pixelRatio: window.devicePixelRatio || 2, // 고해상도 설정
        })

        // 이미지 다운로드
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = 'custom_squad.jpeg'
        link.click()
      } catch (error) {
        console.error('이미지 내보내기 중 오류 발생:', error)
      }
    } else {
      console.error('내보낼 요소를 찾을 수 없습니다.')
    }
  }

  return (
    <>
      {showGuide && <OverlayGuide onClose={handleCloseGuide} />}
      <div className="page-large">
        <div className="mb-7 mt-[50px] flex w-full justify-end">
          <Breadcrumbs pages={['HOME', 'Player', '커스텀 스쿼드']} />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleRefresh}
            className="rounded-lg bg-red-500 px-4 py-2 text-white shadow-md hover:bg-red-600"
          >
            초기화
          </button>
          <button
            onClick={handleCapture}
            className="rounded-lg bg-black px-4 py-2 text-white shadow-md hover:bg-black"
          >
            이미지 내보내기
          </button>
        </div>

        <div className="flex h-screen flex-col gap-6 md:flex-row">
          <div className="mt-4">
            <div className="mb-5">
              <Title text="선수 목록" />
            </div>
            <PlayerList
              cards={cards}
              draggedCard={draggedCard}
              handleDrag={handleDrag}
              handleDragEnd={handleDragEnd}
            />
          </div>

          <div
            ref={captureRef}
            className="relative h-full w-full flex-grow rounded-lg p-4 shadow-md md:w-4/5"
          >
            <div className="mb-3 w-3/4">
              <CustomSquadTable
                player={squareStates.map((data) => data.status.playerName)}
              />
            </div>

            <div className="my-8 p-6">
              <h1 className="text-3xl font-bold text-gray-800">
                ⚾ KT wiz의 다음 스쿼드를 직접 만들어 주세요!
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                여러분의 스쿼드를 만들고 게시판에 공유해보세요!
              </p>
            </div>

            <Image
              src={bgSrc}
              alt="야구 필드"
              fill
              style={{ objectFit: 'contain' }}
              loading="lazy"
              className="p-8"
            />
            <div className="absolute inset-0">
              {squareStates.map((position, index) => (
                <div
                  key={index}
                  onDrop={() => handleDrop(index)}
                  onDragOver={handleDragOver}
                  className="group absolute flex h-[104px] w-[70px] items-center justify-center rounded-lg border border-gray-300 bg-white bg-opacity-50 text-xs text-black"
                  style={{
                    top: position.top,
                    left: position.left,
                  }}
                >
                  {position.status.playerPrvwImg ? (
                    <Image
                      src={position.status.playerPrvwImg}
                      alt={
                        position.status.position || position.status.playerName
                      }
                      className="h-full w-full rounded-lg object-cover"
                      fill
                    />
                  ) : (
                    position.status.position
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
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
