
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverDomain } from "@/util/server";
import { useSearchParams } from "next/navigation";

function useGetProfile(token: string | null) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/profile/self', {
          headers: {
            Authorization: token,
          },
        });
        setProfile(response.data.data.user);
      } catch (error) {
      
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  return profile;
}

export default function Profile() {
  const { token } = useUserStore();
  const profile = useGetProfile(token);
  const { toast } = useToast();

  const handleEditProfile = () => {
    // Logic to handle profile edit
  };

  const handleDeleteAccount = async () => {
    try {
      const { data } = await axios.delete("/api/profile/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.error) {
        toast({ title: "Delete Account Error", description: data.error.message });
      } else {
        toast({ title: "Account Deleted", description: "Your account has been deleted successfully." });
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
      toast({ title: "Delete Account Error", description: "An error occurred while deleting your account." });
    }
  };

  if (!profile) return null;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto mt-10">
      <div className="flex justify-center mb-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt={`${profile.firstName} ${profile.lastName}`} />
          <AvatarFallback>{profile.firstName[0]}{profile.lastName[0]}</AvatarFallback>
        </Avatar>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
        <p className="text-gray-600">{profile.email}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-gray-700 font-medium">Gender:</div>
        <div className="text-gray-900">{profile.gender}</div>
        
        <div className="text-gray-700 font-medium">Birthdate:</div>
        <div className="text-gray-900">{new Date(profile.birthdate).toLocaleDateString()}</div>

        <div className="text-gray-700 font-medium">Created At:</div>
        <div className="text-gray-900">{new Date(profile.createdAt).toLocaleString()}</div>

        <div className="text-gray-700 font-medium">Updated At:</div>
        <div className="text-gray-900">{new Date(profile.updatedAt).toLocaleString()}</div>
      </div>

      <div className="mt-6 flex justify-between">
        <Button onClick={handleEditProfile} className="bg-blue-500 text-white">Edit Profile</Button>
        <Button onClick={handleDeleteAccount} className="bg-red-500 text-white">Delete Account</Button>
      </div>
    </div>
  );
}