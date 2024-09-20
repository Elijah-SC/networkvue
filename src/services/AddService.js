import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Ad } from "@/models/Ad.js"
import { AppState } from "@/AppState.js"

class AdService {
  async getAds() {
    const response = await api.get(`api/ads`)
    logger.log(`got Adds`, response.data)
    const newAds = response.data.map(adPOJO => new Ad(adPOJO))
    AppState.ads = newAds
    logger.log(`NEW ADS`, newAds)
  }

}

export const addService = new AdService()