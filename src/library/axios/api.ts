import axios from './index'
import { ITestResponse, IResponse } from '@/types'

export function getFollowingList(): Promise<IResponse<ITestResponse[]>> {
  return axios.get(`/following_list`)
}

export function getForYouList(): Promise<IResponse<ITestResponse[]>> {
  return axios.get(`/for_you_list`)
}
