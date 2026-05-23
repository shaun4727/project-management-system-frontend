'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreVertical, Send } from 'lucide-react';
import { useState } from 'react';
import { Comment } from '../types/task.types';

interface CommentsSectionProps {
	initialComments: Comment[];
}

// CLIENT COMPONENT (Manages Comment Input State)
export function CommentsSection({ initialComments }: CommentsSectionProps) {
	const [comments, setComments] = useState<Comment[]>(initialComments);
	const [newComment, setNewComment] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!newComment.trim()) return;

		const comment: Comment = {
			id: Date.now().toString(),
			author: { id: 'me', name: 'Alex Johnson', initials: 'AJ' },
			text: newComment,
			timestamp: 'Just now',
		};

		setComments([...comments, comment]);
		setNewComment('');
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-lg font-bold text-slate-900">Comments</h3>
				<button className="text-slate-400 hover:text-slate-600">
					<MoreVertical className="h-5 w-5" />
				</button>
			</div>

			<div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-6 custom-scrollbar">
				{comments.map((comment) => (
					<div key={comment.id} className="flex gap-3">
						<Avatar className="h-8 w-8 mt-1 shrink-0">
							{comment.author.avatarUrl && <AvatarImage src={comment.author.avatarUrl} />}
							<AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-bold">
								{comment.author.initials}
							</AvatarFallback>
						</Avatar>
						<div>
							<div className="flex items-center gap-2 mb-1.5">
								<span className="text-sm font-bold text-slate-900">{comment.author.name}</span>
								<span className="text-xs text-slate-400 font-medium">{comment.timestamp}</span>
							</div>
							<div className="bg-slate-50 border border-slate-100 text-slate-700 text-sm p-3 rounded-2xl rounded-tl-none">
								{comment.text}
							</div>
						</div>
					</div>
				))}
			</div>

			<form onSubmit={handleSubmit} className="relative mt-auto">
				<input
					type="text"
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					placeholder="Write a comment..."
					className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 shadow-sm"
				/>
				<Button
					type="submit"
					size="icon"
					className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg bg-indigo-600 hover:bg-indigo-700"
					disabled={!newComment.trim()}
				>
					<Send className="h-4 w-4" />
				</Button>
			</form>
		</div>
	);
}
