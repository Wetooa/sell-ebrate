"use client"
import { useRouter, useParams } from 'next/navigation'
import React from 'react'

export default function ProductPage() {
  const { id } = useParams();

  // TODO: logic where it grabs data about that product as well as comments, rating, and stuff

  return (
    <div>A single product here  with id {id}</div>
  )
}

