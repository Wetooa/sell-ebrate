"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverDomain } from "@/util/server";
import { useRouter } from "next/router";
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

      // TODO: toast here

      setProfile(data.data.user);
    };
    fetchProfile();
  }, [token]);

  return profile;
}

export default function Profile() {
  const { token } = useUserStore();

  // TODO: get other users profile
  // const { id } = router.query;

  const profile = useGetProfile(token);

  if (!profile) return null;

  return <div>
    <div className="w-32 aspect-square rounded-full"></div>

    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>

    <div>
      {profile.firstName} {profile.lastName}
    </div>

    <div>
      {profile.email}
    </div>

    <div>
      {profile.gender}
    </div>

  </div>;
}
