import { getEnv, IStateTreeNode } from "mobx-state-tree"
import { Environment } from "c:/Users/sma-J/Downloads/New folder/New folder/Store/src/lib/store-wrapper/configurations/environment"

/**
 * Adds a environment property to the node for accessing our
 * Environment in strongly typed.
 */
export const withEnvironment = (self: IStateTreeNode) => ({
  views: {
    /**
     * The environment.
     */
    get environment() {
      return getEnv<Environment>(self)
    },
  },
})
