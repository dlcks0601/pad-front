import { hubTagItems } from '@/constants/hub/hubTagItems';
import { meetingTagItems } from '@/constants/hub/meetingTagItems';
import { roleItems } from '@/constants/hub/roleItems';
import { roleTagItems } from '@/constants/hub/roleTagsItems';
import { skillTagItems } from '@/constants/hub/skillTagItems';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface HubState {
  title: string;
  content: string;
  role: '' | keyof typeof roleItems;
  hub_type: '' | keyof typeof hubTagItems;
  start_date: string;
  duration: string;
  work_type: '' | keyof typeof meetingTagItems;
  recruiting: boolean;
  skills: (keyof typeof skillTagItems)[];
  detail_roles: (keyof typeof roleTagItems)[];
}

interface HubAction {
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setRole: (role: keyof typeof roleItems) => void;
  setHubType: (hub_type: keyof typeof hubTagItems) => void;
  setStartDate: (start_date: string) => void;
  setDuration: (duration: string) => void;
  setWorkType: (work_type: keyof typeof meetingTagItems) => void;
  setRecruiting: (recruiting: boolean) => void;
  setSkills: (skills: (keyof typeof skillTagItems)[]) => void;
  setDetailRoles: (detail_roles: (keyof typeof roleTagItems)[]) => void;
}

const initialState: HubState = {
  title: '',
  content: '',
  role: '',
  hub_type: '',
  start_date: '',
  duration: '',
  work_type: '',
  recruiting: false,
  skills: [],
  detail_roles: [],
};

type HubStore = HubState & HubAction;

const useHubStore = create<HubStore>()(
  devtools(
    immer<HubStore>((set) => ({
      ...initialState,
      setTitle: (title) =>
        set((state) => {
          state.title = title;
        }),
      setContent: (content) =>
        set((state) => {
          state.content = content;
        }),
      setRole: (role) =>
        set((state) => {
          state.role = role;
        }),
      setHubType: (hub_type) =>
        set((state) => {
          state.hub_type = hub_type;
        }),
      setStartDate: (start_date) =>
        set((state) => {
          state.start_date = start_date;
        }),
      setDuration: (duration) =>
        set((state) => {
          state.duration = duration;
        }),
      setWorkType: (work_type) =>
        set((state) => {
          state.work_type = work_type;
        }),
      setRecruiting: (recruiting) =>
        set((state) => {
          state.recruiting = recruiting;
        }),
      setSkills: (skills) =>
        set((state) => {
          state.skills = skills;
        }),
      setDetailRoles: (detail_roles) =>
        set((state) => {
          state.detail_roles = detail_roles;
        }),
    }))
  )
);

export default useHubStore;
