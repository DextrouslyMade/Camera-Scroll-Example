'use client';
import { useRef, useEffect, useState } from 'react';
import { throttle } from 'lodash';

export default function StickyVideo() {
    const parentRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);






    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                setIsVisible(entries[0].isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0
            }
        );

        if (parentRef.current) {
            observer.observe(parentRef.current);
        }

        const handleScroll = () => {
            if (parentRef.current && isVisible && videoRef.current) {
                const { top, height } = parentRef.current.getBoundingClientRect();
                const maxScroll = height - window.innerHeight;
                const scrolled = Math.min(maxScroll, Math.max(0, -top));
                const scrollProgress = scrolled / maxScroll;

                videoRef.current.currentTime = scrollProgress * 6;
                setScrollY(scrolled);
            }
        };

        const throttledHandleScroll = throttle(handleScroll, 50);

        window.addEventListener('scroll', throttledHandleScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };

    }, [isVisible]);
    return (
        <div ref={parentRef} className="relative h-[7000px]">
            <video ref={videoRef} muted loop playsInline preload="auto" className='w-full h-screen sticky top-0 object-fill'>
                <source src="/forniteDance.mp4" type="video/mp4" />
            </video>
        </div>
    );
};
