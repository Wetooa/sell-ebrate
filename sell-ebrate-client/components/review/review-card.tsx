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
      try {
        const { data: p } = await axios.get('/api/reply', {
          params: { reviewId },
        });

        setReplies(p.data.replies);
      } catch (error) {
        console.error("Failed to fetch replies:", error);
        // TODO: Implement error handling, e.g., toast error message
      }
    };

    fetchReplies();
  }, [reviewId]);

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

