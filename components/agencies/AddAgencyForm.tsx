'use client';

import { Button } from '@/components/common/ui/button';
import { Input } from '@/components/common/ui/input';
import { Label } from '@/components/common/ui/label';
import { Loader } from 'lucide-react';
import React, { useState } from 'react';
import MapSelector from './MapSelector';

interface AddAgencyFormProps {
    onClose: () => void;
    onSubmit?: (data: AgencyFormData) => Promise<void>;
}

export interface AgencyFormData {
    agencyName: string;
    branchName: string;
    contactPerson: string;
    phoneNumber: string;
    address: string;
    latitude: number;
    longitude: number;
    placeName?: string;
    image?: File;
}

export default function AddAgencyForm({ onClose, onSubmit }: AddAgencyFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<AgencyFormData>({
        agencyName: '',
        branchName: '',
        contactPerson: '',
        phoneNumber: '',
        address: '',
        latitude: 0,
        longitude: 0,
        placeName: '',
    });

    const handleInputChange = (field: keyof Omit<AgencyFormData, 'latitude' | 'longitude' | 'placeName'>) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleLocationChange = (lat: number, lng: number, placeName?: string) => {
        setFormData((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
            placeName: placeName || '',
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const isFormValid = (): boolean => {
        if (!formData.agencyName.trim()) return false;
        if (!formData.branchName.trim()) return false;
        if (!formData.phoneNumber.trim()) return false;
        if (!formData.address.trim()) return false;
        // Check if coordinates are set (allow 0 for either, but not both 0)
        if (formData.latitude === 0 && formData.longitude === 0) return false;
        // Also ensure coords are actually valid numbers (not NaN)
        if (isNaN(formData.latitude) || isNaN(formData.longitude)) return false;
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.agencyName.trim()) {
            setError('Agency name is required');
            return;
        }
        if (!formData.branchName.trim()) {
            setError('Branch name is required');
            return;
        }
        if (!formData.phoneNumber.trim()) {
            setError('Contact phone is required');
            return;
        }
        if (!formData.address.trim()) {
            setError('Address is required');
            return;
        }
        if (formData.latitude === 0 && formData.longitude === 0) {
            setError('Please select a location on the map');
            return;
        }

        if (onSubmit) {
            try {
                setIsLoading(true);
                // Round coordinates to 6 decimal places to avoid backend validation errors
                const roundedFormData = {
                    ...formData,
                    latitude: parseFloat(formData.latitude.toFixed(6)),
                    longitude: parseFloat(formData.longitude.toFixed(6)),
                    image: imageFile || undefined,
                };
                await onSubmit(roundedFormData);
                onClose();
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to add agency');
            } finally {
                setIsLoading(false);
            }
        } else {
            console.log('Form Data:', formData, 'Image:', imageFile);
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

            {/* Agency Section */}
            <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">Agency Information</h4>
                <div>
                    <Label htmlFor="agencyName" className="mb-2 block">
                        Agency Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="agencyName"
                        placeholder="Enter agency name"
                        value={formData.agencyName}
                        onChange={handleInputChange('agencyName')}
                        disabled={isLoading}
                    />
                </div>
            </div>

            {/* Branch Section - 2 Column Grid */}
            <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">Branch Information</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="branchName" className="mb-2 block">
                            Branch Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="branchName"
                            placeholder="Enter branch name"
                            value={formData.branchName}
                            onChange={handleInputChange('branchName')}
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <Label htmlFor="phoneNumber" className="mb-2 block">
                            Contact Phone <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="phoneNumber"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            maxLength={15}
                            value={formData.phoneNumber}
                            onChange={handleInputChange('phoneNumber')}
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <Label htmlFor="contactPerson" className="mb-2 block">
                            Contact Person
                        </Label>
                        <Input
                            id="contactPerson"
                            placeholder="Enter contact person name"
                            value={formData.contactPerson}
                            onChange={handleInputChange('contactPerson')}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Full Width Address */}
                    <div>
                        <Label htmlFor="address" className="mb-2 block">
                            Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="address"
                            placeholder="Enter full branch address"
                            value={formData.address}
                            onChange={handleInputChange('address')}
                            disabled={isLoading}
                            // className="w-full px-3 py-2  rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                           
                        />
                    </div>
                </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">Agency Image</h4>
                <div className="flex gap-4 items-start">
                    <div className="flex-1">
                        <Label htmlFor="agencyImage" className="mb-2 block">
                            Upload Image
                        </Label>
                        <Input
                            id="agencyImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            disabled={isLoading}
                            className="cursor-pointer"
                        />
                        <p className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
                    </div>
                    {imagePreview && (
                        <div className="flex-shrink-0">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setImageFile(null);
                                    setImagePreview(null);
                                }}
                                className="mt-2 text-xs text-red-600 hover:text-red-700"
                            >
                                Remove image
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Location Section - Full Width */}
            <div className="space-y-3">
                <MapSelector
                    latitude={formData.latitude}
                    longitude={formData.longitude}
                    placeName={formData.placeName}
                    onLocationChange={handleLocationChange}
                />
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
                        'Create Agency'
                    )}
                </Button>
            </div>
        </form>
    );
}
