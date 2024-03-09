import { getEnv, getRoot, IStateTreeNode } from "mobx-state-tree"
import { Environment } from "../environment"
import { RootStore, RootStoreModel } from "../root-store/root-store"

/**
 * Adds a environment property to the node for accessing our
 * Environment in strongly typed.
 */
export const withRootStore = (self: IStateTreeNode) => ({
  views: {
    /**
     * The environment.
     */
    get rootStore(): RootStore {
      return getRoot<typeof RootStoreModel>(self)
    },
  },
})
