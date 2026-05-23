'use client';

import gsap from 'gsap';
import { ReactNode, useLayoutEffect, useRef } from 'react';

interface AnimatedContainerProps {
	children: ReactNode;
	className?: string;
	stagger?: boolean;
}

export function AnimatedContainer({ children, className = '', stagger = false }: AnimatedContainerProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			if (stagger) {
				gsap.fromTo(
					'.gsap-item',
					{ opacity: 0, y: 20 },
					{ opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out' },
				);
			} else {
				gsap.fromTo(
					containerRef.current,
					{ opacity: 0, y: 10 },
					{ opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
				);
			}
		}, containerRef);

		return () => ctx.revert();
	}, [stagger]);

	return (
		<div ref={containerRef} className={className}>
			{children}
		</div>
	);
}
