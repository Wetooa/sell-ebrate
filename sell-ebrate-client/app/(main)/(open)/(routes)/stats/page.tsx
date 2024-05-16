"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
import dynamic from "next/dynamic";



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

const BarChart = dynamic(() => import('@/components/charts/BarChart'), { ssr: false });

export default function StatsPage() {

  const [action, setAction] = useState("getProductCount");
  const stats = useGetStats(action);

  return (
    <div>
      <div>
        Action: {action}
      </div>


      <Select onValueChange={(state) => { setAction(state) }}>
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


      <div>

        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>


      <div>
        <BarChart />
      </div>



    </div >
  )
}

