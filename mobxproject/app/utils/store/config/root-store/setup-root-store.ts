import { Environment } from "../environment"
import { RootStoreModel, RootStore } from "./root-store"
/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createEnvironment() {
  const env = new Environment()
  await env.setup()
  return env
}

/**
 * Setup the root state.
 */
export async function setupRootStore(data?: any) {
  let rootStore: RootStore

  // prepare the environment that will be associated with the RootStore.
  const env = await createEnvironment();
  try {

    data = (data) || {}
    rootStore = RootStoreModel.create(data, env)
  } catch (e: any) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({}, env)

    // but please inform us what happened
    console.error(e.message, null)
  }
  return rootStore
}
