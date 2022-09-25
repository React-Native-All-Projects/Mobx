import { Api } from "../../services/config/api"

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
  constructor() {
    this.api = new Api()
  }

  async setup(isMobile: boolean) {
    await this.api.setup(isMobile)
  }
  /**
   * Our api.
   */
  api: Api
}
