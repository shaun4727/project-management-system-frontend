'use client';

import gsap from 'gsap';
import { ReactNode, useLayoutEffect, useRef } from 'react';

interface AnimatedTimeLogSectionProps {
	children: ReactNode;
}

// CLIENT COMPONENT WRAPPER: Handles GSAP animations without forcing the children to be Client Components
export function AnimatedTimeLogSection({ children }: AnimatedTimeLogSectionProps) {
	const sectionRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			// Fade in the container
			gsap.fromTo(
				sectionRef.current,
				{ opacity: 0, y: 15 },
				{ opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
			);

			// Stagger the history list items
			gsap.fromTo(
				'.time-log-item',
				{ opacity: 0, x: 10 },
				{ opacity: 1, x: 0, duration: 0.3, stagger: 0.1, delay: 0.2, ease: 'power2.out' },
			);
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<div
			ref={sectionRef}
			className="bg-white border border-slate-100 rounded-2xl shadow-sm w-full max-w-4xl overflow-hidden"
		>
			{children}
		</div>
	);
}
