export class Ad {
  constructor(data) {
    this.title = data.title
    this.linkURL = data.linkURL
    this.tall = data.tall
    this.square = data.square
    this.square = data.square
    this.banner = data.banner
  }

  get AdLink() {
    return `https://` + `${this.linkURL}`
  }
}

const data = {
  "title": "SiteClone",
  "linkURL": "boisecodeworks.com",
  "tall": "https://codeworks.blob.core.windows.net/public/assets/ads/TallAdSiteClone.png",
  "square": "https://codeworks.blob.core.windows.net/public/assets/ads/SquareAdSiteClone.png",
  "banner": "https://codeworks.blob.core.windows.net/public/assets/ads/BannerAdSiteClone.png"
}