"use client"

import { useState, useRef, useEffect } from "react";
import { getProducts, getReviews } from "@/api/api";
import { Card } from "@/components/Card/Card";
import { Cart } from "@/components/Cart/Cart";
import { Review } from "@/components/Review/Review";
import { Product, Review as ReviewType, ProductsResponse } from "@/types";

export default function Home() {
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const observer = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const loadProducts = async (): Promise<void> => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const newProducts: ProductsResponse = await getProducts(page, 20);
            setProducts(prevProducts => [...prevProducts, ...(newProducts?.items || [])]);
            setHasMore(newProducts.items.length > 0 && products.length < newProducts.total);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setIsLoading(false);
        }
    };

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

    const initializeData = async (): Promise<void> => {
        try {
            const [productsData, reviewsData] = await Promise.all([
                getProducts(1, 20),
                getReviews()
            ]);
            setProducts(productsData?.items || []);
            setReviews(reviewsData);
            setHasMore(productsData.items.length > 0);
            initializeObserver();
        } catch (error) {
            console.error('Error initializing data:', error);
        }
    };

    useEffect(() => {
        initializeData();
    }, []);

    useEffect(() => {
        if (page > 1) {
            loadProducts();
        }
    }, [page]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-start gap-32">
            <Review reviews={reviews} />
            <div className='w-full flex flex-col justify-center items-center'>
                <Cart/>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                    {products?.map((product) => (
                        <Card key={product.id} product={product} />
                    ))}
                </div>
                <div ref={sentinelRef} className="h-20" />
            </div>
        </main>
    );
} 