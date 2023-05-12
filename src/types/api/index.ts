export interface IUserProfileResponse {
  uuid: string
  username: string
  nickname: string
  groups: number[]
}

export interface IGameItem {
  game_no: string
  game_name: string
  game_status: number
  start_datetime: string
  start_long: number
  start_lat: number
  end_long: number
  end_lat: number
  gpxs: IPigeonItem[]
}

export interface IPigeonItem {
  file_no: string
  pigeon_name: string
  pigeon_no: string
  color?: string
}

export interface IResponse<T> {
  data: T
  result_code: string
  result_message: string
}
