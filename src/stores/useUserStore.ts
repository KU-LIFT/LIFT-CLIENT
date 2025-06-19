import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
	userId: number | null;
	setUserId: (id: number) => void;
	clearUserId: () => void;
};

const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			userId: null,
			setUserId: (id) => set({ userId: id }),
			clearUserId: () => set({ userId: null }),
		}),
		{
			name: 'user-storage',
		}
	)
);

export default useUserStore;
