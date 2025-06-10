import { create } from 'zustand';

type ProjectKeyState = {
	projectKey: string;
	setProjectKey: (key: string) => void;
};

const useProjectKeyStore = create<ProjectKeyState>((set) => ({
	projectKey: '',
	setProjectKey: (key) => set({ projectKey: key }),
}));

export default useProjectKeyStore;
