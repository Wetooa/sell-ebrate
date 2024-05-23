
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
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: token,
          },
        });

        // Display toast message

        // Extract data from the response object
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
  const searchParams = useSearchParams();
  const accountId = searchParams.get("id");

  // TODO: get other users profile
  // const { id } = router.query;


  if (!accountId) return null;
  const profile = useGetProfile(accountId);

  return <div>Data: {profile}</div>;
}