"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverDomain } from "@/util/server";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

import { useUserStore } from "@/store/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function useGetProfile(token: string | null) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await axios.get('/api/profile/self', {
        headers: {
          Authorization: token,
        },
      } as any);

      setProfile(data.data.user);
    };
    fetchProfile();
  }, [token]);

  return profile;
}


export default function Profile() {
  const { token } = useUserStore();

  const profile = useGetProfile(token);

  const handleDeleteAccount = async () => {
    try {
      await axios.delete('/api/profile/self', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Redirect to the home page or login page after successful deletion
      router.push("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  if (!profile) return null;
  return (
    <div className="p-12 bg-white shadow-md rounded-lg max-w-md mx-auto mt-16">
      <div className="flex justify-center mb-12">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt={`${profile.firstName} ${profile.lastName}`} />
          <AvatarFallback>{profile.firstName[0]}{profile.lastName[0]}</AvatarFallback>
        </Avatar>
      </div>

      <div className="text-center mb-8">
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="text-gray-700 font-medium">Firstname:</div>
        <p className="text-gray-600">{profile.firstName}</p>

        <div className="text-gray-700 font-medium">Lastname:</div>
        <p className="text-gray-600">{profile.lastName}</p>

        <div className="text-gray-700 font-medium">Email:</div>
        <p className="text-gray-600">{profile.email}</p>

      
        <div className="text-gray-700 font-medium">Email:</div>
        <p className="text-gray-600">{profile.email}</p>

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
        {/* <Button onClick={handleEditProfile} className="bg-blue-500 text-white">Edit Profile</Button> */}
       <Button onClick={handleDeleteAccount} className="bg-red-500 text-white">Delete Account</Button>
      </div>
    </div>
  );
}