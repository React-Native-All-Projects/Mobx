import { onSnapshot } from "mobx-state-tree";
import React, { useEffect, useState } from "react";
import { RootStore, RootStoreModel } from "../utils/store/config/root-store/root-store";
import { RootStoreProvider } from "../utils/store/config/root-store/root-store-context";
import { setupRootStore } from "../utils/store/config/root-store/setup-root-store";
import ListUsers from "./screens/list-users";

const Layout = () =>{
    const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

    useEffect(() => {
      (async () => {
        setupRootStore().then(setRootStore)
      })()
    }, []);

    useEffect(() => {
      if (rootStore) {
        onSnapshot(rootStore, (snapshot) => {})
      }
    }, [rootStore]);

    if(!rootStore){return null;}
    return (
        <RootStoreProvider value={rootStore}>
            <ListUsers/>
        </RootStoreProvider>
    )
}

export default Layout;
