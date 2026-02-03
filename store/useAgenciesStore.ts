import { Agency } from '@/components/agencies/types'
import { agencyUsers, new_agency } from '@/src/utils/endpoints'
import { apiClient } from '@/src/utils/httpClient'
import { create } from 'zustand'
import { useAuthStore } from './useAuthStore'

type AgenciesState = {
    agencies: Agency[],
    selectedAgency?: Agency,
    setAgencies: (items: Agency[]) => void
    setSelectedAgency: (id: string) => void
    addAgency: (item: FormData) => Promise<Agency>
    getAgencies: () => Promise<Agency[]>
    updateAgency: (id: string, patch: Partial<Agency>) => void
    removeAgency: (id: string) => void
    getAgencyById: (id: string) => Agency | undefined
}

export const useAgenciesStore = create<AgenciesState>((set, get) => ({
    agencies: [],
    setAgencies: (items: Agency[]) => set({ agencies: items }),
    addAgency: async (item) => {
        const response = await apiClient.post<Agency>(new_agency, item,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        set({ agencies: [...get().agencies, response] })
        return response
    },
    setSelectedAgency: (id) => {
        const agency = get().agencies.find((a) => a.id === id)
        set({ selectedAgency: agency })
    },
    updateAgency: (id, patch) => {
        set({
            agencies: get().agencies.map((a) => (a.id === id ? { ...a, ...patch } : a)),
        })
    },
    getAgencies: async () => {
        const { user, isAuthenticated } = useAuthStore.getState()
        if (!isAuthenticated || !user) return []
        const response = await apiClient.get<Agency[]>(agencyUsers(user.agency_details.branch_details.agency))
        set({ agencies: response })
        return response
    },
    removeAgency: (id) => {
        set({ agencies: get().agencies.filter((a) => a.id !== id) })
    },
    getAgencyById: (id) => get().agencies.find((a) => a.id === id),
}))

export default useAgenciesStore
