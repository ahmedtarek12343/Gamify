"use client";
import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = <T extends HTMLElement>(
  options?: IntersectionObserverInit,
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<T>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [options]);
  return { observerRef, isIntersecting };
};
