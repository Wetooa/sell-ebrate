
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverDomain } from "@/util/server";
import { useSearchParams } from "next/navigation";

function useGetProfile(accountId: string) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await axios({
        method: "GET", url: serverDomain + "profile", data: { accountId }
      });

      // TODO: toast here

      setProfile(data.data.profile);
    };
    fetchProfile();
  }, [accountId]);

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
