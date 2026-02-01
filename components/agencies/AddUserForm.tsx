'use client';

import { Button } from '@/components/common/ui/button';
import { Input } from '@/components/common/ui/input';
import { Label } from '@/components/common/ui/label';
import { Loader, Upload } from 'lucide-react';
import React, { useState } from 'react';

interface AddUserFormProps {
  onClose: () => void;
  onSubmit?: (data: UserFormData) => Promise<void>;
}

export interface UserFormData {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  isActive: boolean;
  isStaff: boolean;
  profilePicture?: File;
}

export default function AddUserForm({ onClose, onSubmit }: AddUserFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    isActive: true,
    isStaff: false,
  });

  const handleInputChange = (
    field: keyof Omit<UserFormData, 'profilePicture'>
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = field === 'isActive' || field === 'isStaff' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: file,
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid = (): boolean => {
    if (!formData.email.trim()) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return false;
    if (!formData.username.trim()) return false;
    if (!formData.password.trim()) return false;
    if (formData.password.length < 8) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }
    if (!formData.username.trim()) {
      setError('Username is required');
      return;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (onSubmit) {
      try {
        setIsLoading(true);
        await onSubmit(formData);
        onClose();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add user');
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('Form Data:', formData);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Profile Picture Section */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-gray-900">Profile Picture</Label>
        <div className="flex items-center gap-4">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="w-20 h-20 rounded-lg object-cover border border-gray-300"
            />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400">
              <Upload size={24} />
            </div>
          )}
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isLoading}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100
              "
            />
            <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
          </div>
        </div>
      </div>

      {/* Credentials Section */}
      <div className="space-y-3 border-b border-gray-200 pb-6">
        <h4 className="text-sm font-semibold text-gray-900">Credentials</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="mb-2 block">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={formData.email}
              onChange={handleInputChange('email')}
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="username" className="mb-2 block">
              Username <span className="text-red-500">*</span>
            </Label>
            <Input
              id="username"
              placeholder="username"
              value={formData.username}
              onChange={handleInputChange('username')}
              disabled={isLoading}
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="password" className="mb-2 block">
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={handleInputChange('password')}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="space-y-3 border-b border-gray-200 pb-6">
        <h4 className="text-sm font-semibold text-gray-900">Personal Information</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="mb-2 block">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="lastName" className="mb-2 block">
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber" className="mb-2 block">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phoneNumber}
              onChange={handleInputChange('phoneNumber')}
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address" className="mb-2 block">
            Address
          </Label>
          <textarea
            id="address"
            placeholder="Enter full address"
            value={formData.address}
            onChange={handleInputChange('address')}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            rows={2}
          />
        </div>
      </div>

      {/* Permissions Section */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-900">Permissions</h4>
        
        <div className="flex items-center gap-2">
          <input
            id="isActive"
            type="checkbox"
            checked={formData.isActive}
            onChange={handleInputChange('isActive')}
            disabled={isLoading}
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 cursor-pointer"
          />
          <Label htmlFor="isActive" className="cursor-pointer text-sm text-gray-700">
            Active User
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="isStaff"
            type="checkbox"
            checked={formData.isStaff}
            onChange={handleInputChange('isStaff')}
            disabled={isLoading}
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 cursor-pointer"
          />
          <Label htmlFor="isStaff" className="cursor-pointer text-sm text-gray-700">
            Staff Member (Admin Access)
          </Label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading || !isFormValid()}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader size={16} className="animate-spin mr-2" />
              Creating...
            </>
          ) : (
            'Create User'
          )}
        </Button>
      </div>
    </form>
  );
}
