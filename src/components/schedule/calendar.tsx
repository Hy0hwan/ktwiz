import React from 'react'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  parse,
} from 'date-fns'
import { ko } from 'date-fns/locale'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { GameScheduleData } from '@/types'
import Link from 'next/link'

interface CalendarProps {
  gameData: GameScheduleData[]
  currentDate: string
}

const Calendar = ({ gameData, currentDate }: CalendarProps) => {
  const formattedCurrentDate = parse(currentDate, 'yyyyMM', new Date())

  // 헤더 렌더링
  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy'
    return (
      <div className="mb-5 flex items-center justify-between">
        <Link
          className="rounded-full border border-gray-200 px-4 leading-8"
          href={`/game/regular/schedule/${format(new Date(), 'yyyyMM')}`}
        >
          Today
        </Link>
        <Link
          className="ml-1.5 flex h-8 w-8 items-center rounded-full border text-xl font-bold text-gray-600 hover:text-gray-800"
          href={`/game/regular/schedule/${format(new Date(formattedCurrentDate).setMonth(formattedCurrentDate.getMonth() - 1), 'yyyyMM')}`}
        >
          <ChevronLeftIcon className="mx-auto size-5" />
        </Link>
        <Link
          className="ml-1.5 flex h-8 w-8 items-center rounded-full border text-xl font-bold text-gray-600 hover:text-gray-800"
          href={`/game/regular/schedule/${format(new Date(formattedCurrentDate).setMonth(formattedCurrentDate.getMonth() + 1), 'yyyyMM')}`}
        >
          <ChevronRightIcon className="mx-auto size-5" />
        </Link>
        <div className="ml-3 mr-auto text-lg font-semibold text-gray-800">
          {format(formattedCurrentDate, dateFormat, { locale: ko })}
        </div>

        {/* 경기 전환 */}
        <div className="rounded-full border border-gray-200 px-4 leading-8">
          <button>KT 경기</button>
          <button>전체 경기</button>
        </div>
      </div>
    )
  }

  // 요일 렌더링
  const renderDays = () => {
    const days = []
    const startDate = startOfWeek(formattedCurrentDate, { weekStartsOn: 0 })

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="flex items-center justify-center text-sm font-medium text-gray-600"
        >
          {format(addDays(startDate, i), 'EEEE', { locale: ko }).charAt(0)}
        </div>,
      )
    }
    return <div className="grid grid-cols-7">{days}</div>
  }

  // 일자 렌더링
  const renderCells = () => {
    const monthStart = startOfMonth(formattedCurrentDate)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const rows = []
    let days = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'yyyyMMdd')

        // 해당 날짜의 게임 데이터 필터링
        const dailyGames = gameData.filter(
          (game) => game.displayDate === formattedDate,
        )

        // 같은 날짜의 경기 결과를 합쳐서 처리
        const gameOutcomes = dailyGames.map((game) => game.outcome).join('/')

        days.push(
          <div
            key={day.toString()}
            className={`relative flex h-32 flex-col rounded-md border border-gray-200 pl-2 pt-1 ${
              !isSameMonth(day, monthStart)
                ? 'bg-gray-100 text-gray-400'
                : 'text-gray-700'
            } cursor-pointer`}
          >
            {/* 날짜 */}
            <span className="absolute text-base">{format(day, 'd')}</span>

            {/* 게임 데이터 렌더링 */}
            {dailyGames.length > 0 && (
              <div className="mt-2 text-xs">
                <div className="mt-2 text-center">
                  <img
                    src={
                      dailyGames[0].visit === 'KT'
                        ? dailyGames[0].homeLogo
                        : dailyGames[0].visitLogo
                    }
                    alt={`KT logo`}
                    className="mx-auto w-16"
                  />
                  <span>
                    {dailyGames[0].gtime} {dailyGames[0].stadium} /{' '}
                    {dailyGames[0].broadcast}
                  </span>
                </div>
                <div className="absolute right-0 top-0">
                  <div
                    className={`h-0 w-0 border-l-[40px] border-t-[40px] border-l-transparent text-sm font-bold ${
                      gameOutcomes.includes('승')
                        ? 'border-t-[#FE653B]'
                        : gameOutcomes.includes('무')
                          ? 'border-[#495A8D]'
                          : gameOutcomes.includes('패')
                            ? 'border-t-[#D6D6D6]'
                            : ''
                    }`}
                  ></div>
                  <span
                    className={`absolute right-1.5 top-2 ${
                      gameOutcomes.includes('승') || gameOutcomes.includes('무')
                        ? 'text-white'
                        : ''
                    }`}
                  >
                    {gameOutcomes}
                  </span>
                </div>
              </div>
            )}
          </div>,
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div key={day.toString()} className="mb-1 grid grid-cols-7 gap-1">
          {days}
        </div>,
      )
      days = []
    }

    return <div>{rows}</div>
  }

  return (
    <div className="mx-auto mt-10 rounded-lg bg-white p-4 shadow-lg">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  )
}

export default Calendar
