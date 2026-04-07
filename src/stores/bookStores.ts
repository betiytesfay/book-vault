import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface VaultBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  isRead: boolean;
}

interface BookStore {
  vault: VaultBook[];
  addToVault: (book: Omit<VaultBook, 'isRead'>) => void;
  removeFromVault: (id: string) => void;
  toggleRead: (id: string) => void;
}

export const useBookStore = create<BookStore>()(
  persist(
    (set) => ({
      vault: [],
      addToVault: (book) =>
        set((state) => {
          if (state.vault.some((b) => b.id === book.id)) return state;
          return { vault: [...state.vault, { ...book, isRead: false }] };
        }),
      removeFromVault: (id) =>
        set((state) => ({ vault: state.vault.filter((b) => b.id !== id) })),
      toggleRead: (id) =>
        set((state) => ({
          vault: state.vault.map((b) =>
            b.id === id ? { ...b, isRead: !b.isRead } : b
          ),
        })),
    }),
    { name: 'book-vault' }
  )
);