import {
  roleItems,
  RoleItemKeys,
  RoleItemValues,
} from '@/constants/hub/roleItems';
import {
  roleTagItemsKey,
  roleTagItemsValue,
} from '@/constants/hub/roleTagsItems';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface HubSearchState {
  sort: boolean;
  role: RoleItemValues | null;
  unit: roleTagItemsValue | string | null;
}

interface HubSearchAction {
  setSort: (sort: boolean) => void;
  setRole: (roleKey: RoleItemKeys | null) => void;
  setUnit: (unitKey: roleTagItemsKey | string | null) => void;
  reset: () => void;
}

const initialState: HubSearchState = {
  sort: true,
  role: null,
  unit: null,
};

const useHubSearchStore = create<HubSearchState & HubSearchAction>()(
  devtools(
    immer((set) => ({
      sort: true,
      role: null,
      unit: null,
      setSort: (sort) => {
        set((state) => {
          state.sort = sort;
        });
      },
      setRole: (roleKey) => {
        set((state) => {
          state.role = roleKey ? roleItems[roleKey] : null;
          state.unit = null;
        });
      },
      setUnit: (unitKey) => {
        set((state) => {
          state.unit = unitKey ?? null;
        });
      },
      reset: () => {
        set(() => ({
          ...initialState,
        }));
      },
    }))
  )
);

export default useHubSearchStore;
