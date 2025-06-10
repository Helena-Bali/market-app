"use client"

import { useState, useRef, useEffect } from "react";


export default function Home() {
  
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const observer = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    

    const handleIntersection = (entries: IntersectionObserverEntry[]): void => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const initializeObserver = (): void => {
        observer.current = new IntersectionObserver(handleIntersection);
        if (sentinelRef.current) {
            observer.current.observe(sentinelRef.current);
        }
    };


    return (
        <main className="flex min-h-screen flex-col items-center justify-start gap-32">

            <div className='w-full flex flex-col justify-center items-center'>
              
                <div ref={sentinelRef} className="h-20" />
            </div>
        </main>
    );
} 