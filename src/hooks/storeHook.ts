import { EqualityChecker, StateSelector } from 'zustand';
import React, { useContext } from 'react';
import shallow from 'zustand/shallow';
import { IHMSReactStore } from './HMSRoomProvider';
import {
  HMSActions,
  HMSStore,
  HMSNotifications,
} from '@100mslive/hms-video-store';
import HMSLogger from '../utils/ui-logger';

export interface HMSContextProviderProps {
  actions: HMSActions; // for actions which may also mutate store
  store: IHMSReactStore; // readonly store, don't mutate this
  notifications?: HMSNotifications;
}

export function makeHMSStoreHook(
  hmsContext: React.Context<HMSContextProviderProps | null>,
) {
  const useHMSStore = <StateSlice>(
    selector: StateSelector<HMSStore, StateSlice>,
    equalityFn: EqualityChecker<StateSlice> = shallow,
  ) => {
    if (!selector) {
      HMSLogger.w(
        'fetching full store without passing any selector may have a heavy performance impact on your website.',
      );
    }
    const HMSContextConsumer = useContext(hmsContext);
    if (!HMSContextConsumer) {
      const error =
        'It seems like you forgot to add your component within a top level HMSRoomProvider, please refer' +
        'to 100ms react docs to check on the required steps for using this hook.';
      throw new Error(error);
    }
    const useStore = HMSContextConsumer.store;
    return useStore(selector, equalityFn);
  };
  return useHMSStore;
}
