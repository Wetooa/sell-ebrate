"use client"

import { StarIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { serverDomain } from "@/util/server";
import { Play } from 'next/font/google';
import axios from 'axios';



function useGetReviewReplies(reviewId: string) {

  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchReplies = async () => {

      const { data: p } = await axios({
        method: "GET",
        url: serverDomain + `reply`,
        params: { reviewId },
      });


      setReplies(p.data.replies);
    };
    fetchReplies();
  }, []);

  return replies;
}

export default function ReviewCard({ review }: { review: any }) {

  const replies = useGetReviewReplies(review.reviewId);

  return (
    <div className='p-2'>

      <h4>{review.firstName} {review.lastName}</h4>
      <div className='flex'>{Array.from({ length: review.rating }).map(() => {
        return (
          <StarIcon />
        )
      })}
      </div>
      <p>{review.message}</p>


      <div className='ml-10'>
        {replies.map((reply: any) => {
          return (
            <div>
              <h5>
                {reply.firstName} {reply.lastName}
              </h5>
              <p>
                {reply.message}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  )
}

