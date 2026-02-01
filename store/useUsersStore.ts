import { User } from '@/types/auth'
import { create } from 'zustand'

type UsersState = {
    users: User[]
    selectedUser: User | null
    setUsers: (items: User[]) => void
    setSelectedUser: (user: User | null) => void
    addUser: (item: Omit<User, 'id'>) => User
    updateUser: (id: string, patch: Partial<User>) => void
    removeUser: (id: string) => void
    getUserById: (id: string) => User | undefined
}

export const useUsersStore = create<UsersState>((set, get) => ({
    users: [],
    selectedUser: null,
    setUsers: (items: User[]) => set({ users: items }),
    setSelectedUser: (user: User | null) => set({ selectedUser: user }),
    addUser: (item) => {
        const id = `u${Date.now().toString()}`
        const user: User = { id, ...item }
        set({ users: [...get().users, user] })
        return user
    },
    updateUser: (id, patch) => {
        set({ users: get().users.map((u) => (u.id === id ? { ...u, ...patch } : u)) })
    },
    removeUser: (id) => {
        set({ users: get().users.filter((u) => u.id !== id) })
    },
    getUserById: (id) => get().users.find((u) => u.id === id),
}))

export default useUsersStore
