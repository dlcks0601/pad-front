// import { HubResponse } from '@/apis/hub.api';

// import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';
// import { immer } from 'zustand/middleware/immer';

// export interface HubDetailState {
//   status: HubResponse['project']['status'];
//   isOwnConnectionHub: HubResponse['isOwnConnectionHub'];
// }

// interface HubDetailAction {
//   setStatus: (status: 'OPEN' | 'CLOSE') => void;
// }

// const initialState: HubDetailState = {
//   status: 'OPEN',
//   isOwnConnectionHub: false,
// };

// type HubDetailStore = HubDetailState & HubDetailAction;

// const useDetailStore = create<HubDetailStore>()(
//   devtools(
//     immer<HubDetailStore>((set) => ({
//       ...initialState,
//       setStatus: (status: 'OPEN' | 'CLOSE') =>
//         set((state) => {
//           state.status = status;
//         }),
//     }))
//   )
// );

// export default useDetailStore;

import { create } from 'zustand';

interface Project {
  projectId: number;
  title: string;
  hubType: string;
  workType: string;
  status: string;
  detailRoles: string[];
  skills: string[];
  role: string;
  startDate: string;
  duration: string;
  content: string;
  createdAt: string;
  manager: {
    userId: number;
  };
}

interface ProjectStore {
  project: Project | null;
  isOwnConnectionHub: boolean;
  setProject: (project: Project, currentUserId: number) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  project: null,
  isOwnConnectionHub: false,
  setProject: (project, currentUserId) =>
    set({
      project,
      isOwnConnectionHub: project.manager.userId === currentUserId,
    }),
}));
