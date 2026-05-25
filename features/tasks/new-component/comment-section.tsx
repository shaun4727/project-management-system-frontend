'use client';

import { addCommentAction } from '@/actions/comment.action';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send } from 'lucide-react';
import { useActionState, useEffect, useRef } from 'react';

interface CommentsSectionProps {
	taskId: string;
	comments: any[]; // The comments array fetched from the page level
}

export function CommentsSectionNew({ taskId, comments = [] }: CommentsSectionProps) {
	// Bind the taskId to the Server Action
	const postCommentWithId = addCommentAction.bind(null, taskId);
	const [state, formAction, isPending] = useActionState(postCommentWithId, null);

	const formRef = useRef<HTMLFormElement>(null);

	// Clear the form after a successful post using the random key we sent from the action
	useEffect(() => {
		if (state?.success) {
			formRef.current?.reset();
		}
	}, [state?.clearForm]);

	// Helper to get initials for the avatar
	const getInitials = (name: string) => {
		if (!name) return '?';
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.substring(0, 2)
			.toUpperCase();
	};

	return (
		<div className="space-y-6">
			<h3 className="text-lg font-bold text-slate-900">Comments ({comments.length})</h3>

			{/* Post Comment Form */}
			<form ref={formRef} action={formAction} className="flex gap-4">
				<div className="h-10 w-10 shrink-0 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
					{/* Hardcoded 'ME' for the current user's avatar in the input box */}
					ME
				</div>
				<div className="flex-1 space-y-2">
					<Textarea
						name="content"
						placeholder="Add a comment or update..."
						className="min-h-[80px] bg-white resize-none"
						required
					/>

					{state?.error && <p className="text-sm text-red-600">{state.error}</p>}

					<div className="flex justify-end">
						<Button
							type="submit"
							disabled={isPending}
							className="bg-indigo-600 hover:bg-indigo-700 text-white"
						>
							{isPending ? (
								<Loader2 className="h-4 w-4 animate-spin mr-2" />
							) : (
								<Send className="h-4 w-4 mr-2" />
							)}
							{isPending ? 'Posting...' : 'Post Comment'}
						</Button>
					</div>
				</div>
			</form>

			{/* Comments List */}
			<div className="space-y-5 mt-8">
				{comments.length === 0 ? (
					<p className="text-center text-sm text-slate-500 py-4">
						No comments yet. Be the first to start the conversation!
					</p>
				) : (
					comments.map((comment) => (
						<div key={comment.id} className="flex gap-4 group">
							<div className="h-10 w-10 shrink-0 rounded-full bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm">
								{getInitials(comment.user?.name)}
							</div>
							<div className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-none p-4 relative">
								<div className="flex items-center justify-between mb-2">
									<span className="font-semibold text-slate-900 text-sm">
										{comment.user?.name || 'Unknown User'}
									</span>
									<span className="text-xs text-slate-400">
										{new Date(comment.createdAt).toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric',
											hour: '2-digit',
											minute: '2-digit',
										})}
									</span>
								</div>
								<p className="text-sm text-slate-600 whitespace-pre-wrap">{comment.content}</p>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}
