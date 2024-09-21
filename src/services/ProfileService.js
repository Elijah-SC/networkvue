import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfileService {
  async findProfileById(profileId) {
    const response = await api.get(`api/profiles/${profileId}`)
    logger.log(`got profile with id ${profileId}`, response.data)
  }

}
export const profileService = new ProfileService()