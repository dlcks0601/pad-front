import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface HubState {
  title: string; // 프로젝트 명
  content: string; // 프로젝트 설명
  role: string; // P, A, D 중 하나
  hubType: string; // 프로젝트, 외주
  startDate: string; // 시작 날짜
  duration: string; // 작업 기간
  durationType: string; // 기간 단위 (개월, 주 등)
  workType: string; // 대면, 비대면
  recruiting: boolean; // 모집 중인지 여부
  skills: string[]; // React, TypeScript 등
  detailRoles: string[]; // Frontend Developer 등 role의 상세 역할
}

interface HubAction {
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setRole: (role: string) => void;
  setHubType: (hubType: string) => void;
  setStartDate: (startDate: string) => void;
  setDuration: (duration: string) => void;
  setDurationType: (durationType: string) => void;
  setWorkType: (workType: string) => void;
  setRecruiting: (recruiting: boolean) => void;
  setSkills: (skills: string[]) => void;
  setDetailRoles: (detailRoles: string[]) => void;
  resetHub: () => void;
}

const initialState: HubState = {
  title: '',
  content: '',
  role: '',
  hubType: '',
  startDate: '',
  duration: '',
  durationType: '',
  workType: '',
  recruiting: false,
  skills: [],
  detailRoles: [],
};

type HubStore = HubState & HubAction;

const useHubStore: () => HubStore = create<HubStore>()(
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
      setHubType: (hubType) =>
        set((state) => {
          state.hubType = hubType;
        }),
      setStartDate: (startDate) =>
        set((state) => {
          state.startDate = startDate;
        }),
      setDuration: (duration) =>
        set((state) => {
          state.duration = duration;
        }),
      setDurationType: (durationType) =>
        set((state) => {
          state.durationType = durationType;
        }),
      setWorkType: (workType) =>
        set((state) => {
          state.workType = workType;
        }),
      setRecruiting: (recruiting) =>
        set((state) => {
          state.recruiting = recruiting;
        }),
      setSkills: (skills) =>
        set((state) => {
          state.skills = skills;
        }),
      setDetailRoles: (detailRoles) =>
        set((state) => {
          state.detailRoles = detailRoles;
        }),
      resetHub: () => set(() => initialState), // immer와 호환되도록 수정
    }))
  )
);

export default useHubStore;
