export type PlayerCode = number | string

export type PlayerChart = string | any
export interface PlayerImage {
  img: string | undefined
}

export interface PlayerDetail {
  data: {
    gameplayer: PlayerDetailDataList
    yearrecordlist: SeasonData[]
  }
}
export interface CourseItem {
  info: string
  style: string
}
export interface BatterChartData {
  'course double': CourseItem[]
  'course home_run': CourseItem[]
  'course single': CourseItem[]
  'course triple': CourseItem[]
}

export interface PlayerDetailDataList {
  backnum?: string // 등번호
  birth?: string // 생년월일
  bloodGroups?: string // 혈액형
  bornPlace?: string // 출생지
  career?: string // 경력
  career2?: string // 추가 경력
  debutYear?: string // 데뷔년도
  energybar?: number // 에너지바 점수
  energybarName?: string // 에너지바 이름
  engName?: string // 영어 이름
  gyear?: string // 년도
  hasFanpage?: string // 팬페이지 여부
  height?: string // 키
  hittype?: string // 타격 유형
  mobilePlayerImg?: string // 모바일 이미지 1
  mobilePlayerImg1?: string // 모바일 이미지 2
  mobilePlayerImg2?: string // 모바일 이미지 3
  money?: string // 연봉
  pcode?: string // 선수 코드
  playerName?: string // 선수 이름
  playerPrvwImg?: string // 선수 이미지 1
  playerPrvwImg1?: string // 선수 이미지 2
  playerPrvwImg2?: string // 선수 이미지 3
  playerPrvwImg3?: string // 선수 이미지 4
  position?: string // 포지션
  position2?: string // 포지션 2
  promise?: string // 약속
  rank?: number // 순위
  rankName?: string // 순위 이름
  teamCode?: string // 팀 코드
  teamName?: string // 팀 이름
  weight?: string // 몸무게
}

export interface PlayerData {
  playerData: PlayerDetailDataList
}

export interface SeasonData {
  era?: string // 방어율 (Earned Run Average)
  gamenum?: number // 출전 경기 수
  w?: number // 승리 수 (Wins)
  l?: number // 패배 수 (Losses)
  sv?: number // 세이브 (Saves)
  hra?: number //타율
  bra?: number //출루율
  hr?: number //홈런
  rbi?: number //타점
}
export interface PlayerSeasonDataProps {
  seasonData: SeasonData
}

/**투구 비율 */
export interface PitchingRatio {
  [key: string]: number
}
/**피칭 값 */
export interface PitchingValue {
  [key: string]: number
}

export interface ChartData {
  pitchingRatio?: PitchingRatio
  pitchingValue?: PitchingValue
}

export interface ChartData2 {
  pitchingRatio?: PitchingRatio
  pitchingValue?: PitchingValue
}
