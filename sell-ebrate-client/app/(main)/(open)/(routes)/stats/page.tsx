"use client"


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { serverDomain } from '@/util/server';
import axios from 'axios';
import React, { useEffect, useState } from 'react'


function useGetStats(action: string) {

  const [stats, setStats] = useState(null);

  useEffect(() => {

    const fetchStats = async () => {
      const { data } = await axios({ method: "GET", url: serverDomain + "report/stats", params: { action: action } });
      setStats(data.data.count);
    }
    fetchStats();

  }, [action])


  return stats;
}

export default function StatsPage() {

  const [action, setAction] = useState("getProductCount");
  const stats = useGetStats(action);

  return (
    <div>
      <div>
        Action: {action}
      </div>


      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Table..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="getProductCount">Product</SelectItem>
          <SelectItem value="getSellerCount">Seller</SelectItem>
          <SelectItem value="getBuyerCount">Buyer</SelectItem>
          <SelectItem value="getPaymentCount">Payment</SelectItem>
          <SelectItem value="getReviewCount">Review</SelectItem>
        </SelectContent>
      </Select>
      <div>
        {stats}
      </div>

    </div>
  )
}

