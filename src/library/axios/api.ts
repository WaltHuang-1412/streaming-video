import axios from './index'
import { IResponse, IGameItem } from '@/types'

export function getGameList({
  start_date,
  end_date
}: {
  start_date: string
  end_date: string
}): Promise<IResponse<IGameItem[]>> {
  return axios.get(`Game/games`, { params: { start_date, end_date } })
}

export function getGameItem({
  game_no
}: {
  game_no: number | string
}): Promise<IResponse<IGameItem[]>> {
  return axios.get(`Game/game`, { params: { game_no } })
}

export function getGameGpx(fileno: string) {
  return axios.get('Game/game-gpx', {
    params: { fileno }
  })
}
