import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Account } from "@/models/Account.js"
import { AppState } from "@/AppState.js"

class ProfileService {

  async findProfileById(profileId) {
    AppState.activeAccount = null
    const response = await api.get(`api/profiles/${profileId}`)
    const newProfile = new Account(response.data)
    AppState.activeAccount = newProfile
  }

}
export const profileService = new ProfileService()