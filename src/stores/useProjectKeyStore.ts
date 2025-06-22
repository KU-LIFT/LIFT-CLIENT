import { create } from 'zustand';

type ProjectKeyState = {
	projectKey: string;
	setProjectKey: (key: string) => void;
};

const useProjectKeyStore = create<ProjectKeyState>((set) => ({
	projectKey: localStorage.getItem('projectKey') || '',
	setProjectKey: (key) => {
		localStorage.setItem('projectKey', key);
		set({ projectKey: key });
	},
}));

export default useProjectKeyStore;
