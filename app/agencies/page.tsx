"use client";

import AddAgencyForm, { AgencyFormData } from "@/components/agencies/AddAgencyForm";
import AddUserForm, { UserFormData } from "@/components/agencies/AddUserForm";
import Header from "@/components/agencies/Header";
import ListSection from "@/components/agencies/ListSection";
import Tabs from "@/components/agencies/Tabs";
import { USERS_DATA } from "@/components/agencies/types";
import { Modal } from "@/components/common/ui/Modal";
import useAgenciesStore from '@/store/useAgenciesStore';
import { useAuthStore } from "@/store/useAuthStore";
import useUsersStore from '@/store/useUsersStore';
import { useEffect, useState } from "react";

export default function AgenciesUsersManagement() {
  const [activeTab, setActiveTab] = useState<'agencies' | 'users'>('agencies');
  const [selectedAgencyId, setSelectedAgencyId] = useState<string>('1');
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [isAddAgencyModalOpen, setIsAddAgencyModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const { agencies, addAgency, getAgencies, selectedAgency, setSelectedAgency, getAgencyById } = useAgenciesStore()
  const { user } = useAuthStore()
  const { users, addUser, setUsers, selectedUser, setSelectedUser, getUserById } = useUsersStore()

  // Badge Helpers
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return "bg-green-100 text-green-700";
      case 'Inactive': return "bg-gray-100 text-gray-700";
      case 'Pending': return "bg-orange-100 text-orange-700";
      case 'Locked': return "bg-red-100 text-red-700";
      case 'Invited': return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin': return "bg-purple-100 text-purple-700 border-purple-200";
      case 'Manager': return "bg-blue-100 text-blue-700 border-blue-200";
      case 'Support Agent': return "bg-cyan-100 text-cyan-700 border-cyan-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };



  const handleAddAgencySubmit = async (data: AgencyFormData) => {
    try {
      if (!user) throw new Error('User not authenticated');

      // Create FormData to handle both JSON fields and image file
      const formDataToSend = new FormData();
      formDataToSend.append('name', data.branchName);
      formDataToSend.append('contact', data.phoneNumber);
      formDataToSend.append('address', data.address);
      formDataToSend.append('agency', user?.agency_details.branch_details.agency || "0");
      formDataToSend.append('latitude', String(data.latitude));
      formDataToSend.append('longitude', String(data.longitude));
      formDataToSend.append('is_active', 'true');

      if (data.image) {
        formDataToSend.append('image', data.image);
      }

      await addAgency(formDataToSend as any)

      setIsAddAgencyModalOpen(false)
    } catch (error) {
      throw error;
    }
  };

  const handleAddUserSubmit = async (data: UserFormData) => {
    try {
      // TODO: Replace with actual API call to your backend
      const formDataToSend = new FormData();
      formDataToSend.append('email', data.email);
      formDataToSend.append('username', data.username);
      formDataToSend.append('password', data.password);
      formDataToSend.append('first_name', data.firstName);
      formDataToSend.append('last_name', data.lastName);
      formDataToSend.append('phone_number', data.phoneNumber);
      formDataToSend.append('address', data.address);
      formDataToSend.append('is_active', data.isActive.toString());
      formDataToSend.append('is_staff', data.isStaff.toString());

      if (data.profilePicture) {
        formDataToSend.append('image', data.profilePicture);
      }

      // const response = await fetch('/api/users', {
      //   method: 'POST',
      //   body: formDataToSend,
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to create user');
      // }

      console.log('User created successfully');
      // Add to local store so UI updates immediately
      addUser(formDataToSend as any)
      setIsAddUserModalOpen(false)
    } catch (error) {
      throw error;
    }
  };

  // Initialize stores from static data if store is empty
  useEffect(() => {
    getAgencies()

    setUsers(USERS_DATA)
  }, [getAgencies, setUsers])

  useEffect(() => {
    setSelectedAgency(agencies[0]?.id || "")
  }, [selectedAgencyId, setSelectedAgency , agencies])
  return (
    <div>
      <Header
        activeTab={activeTab}
        onAddAgency={() => setIsAddAgencyModalOpen(true)}
        onInviteUser={() => setIsAddUserModalOpen(true)}
      />

      <Modal
        isOpen={isAddAgencyModalOpen}
        onClose={() => setIsAddAgencyModalOpen(false)}
        title="Add New Agency"
        backDropClickClose={true}
      >
        <AddAgencyForm
          onClose={() => setIsAddAgencyModalOpen(false)}
          onSubmit={handleAddAgencySubmit}
        />
      </Modal>

      <Modal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        title="Add New User"
        backDropClickClose={true}
      >
        <AddUserForm
          onClose={() => setIsAddUserModalOpen(false)}
          onSubmit={handleAddUserSubmit}
        />
      </Modal>

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <ListSection
          activeTab={activeTab}
          selectedAgencyId={selectedAgencyId}
          selectedUserId={selectedUserId}
          onSelectUser={setSelectedUserId}
          getStatusBadge={getStatusBadge}
          getRoleBadge={getRoleBadge}
        />
          {/* <DetailSection
            activeTab={activeTab}
            selectedAgency={selectedAgency}
            selectedUser={selectedUser}
            getStatusBadge={getStatusBadge}
            getRoleBadge={getRoleBadge}
          /> */}

      </div>
    </div>
  );
}