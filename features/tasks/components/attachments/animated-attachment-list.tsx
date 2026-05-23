'use client';

import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';

interface AnimatedAttachmentListProps {
	children: React.ReactNode;
}

// CLIENT COMPONENT WRAPPER: Handles GSAP Stagger independently so children can remain Server Components
export function AnimatedAttachmentList({ children }: AnimatedAttachmentListProps) {
	const listRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.attachment-row',
				{ opacity: 0, x: -10 },
				{ opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out', delay: 0.1 },
			);
		}, listRef);

		return () => ctx.revert();
	}, []);

	return (
		<div ref={listRef} className="space-y-2 mt-6">
			{children}
		</div>
	);
}
