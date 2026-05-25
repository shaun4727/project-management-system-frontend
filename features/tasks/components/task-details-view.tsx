'use client';

import { fetchCommentAction } from '@/actions/comment.action';
import { fetchTaskDetailsAction } from '@/actions/task.actions'; // <-- Import new action
import { fetchTimeLogsAction } from '@/actions/time-log-action';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCallback, useEffect, useState } from 'react';
import { CommentsSectionNew } from '../new-component/comment-section';
import { TaskDetailsData } from '../types/task.types';
import { TaskAttachmentsTab } from './attachments/task-attachment-tab';
import { LogTimeForm } from './log-time-form';
import { TaskHeader } from './task-header';
import { TimeLogHistory } from './time-log-history';

interface TaskDetailsViewProps {
	task: TaskDetailsData;
}

export function TaskDetailsView({ task }: TaskDetailsViewProps) {
	// Dynamic Data States
	const [taskData, setTaskData] = useState<TaskDetailsData>(task);
	const [comments, setComments] = useState<any[]>([]);
	const [timeLogs, setTimeLogs] = useState<any[]>([]);

	// Loading States
	const [isLoadingComments, setIsLoadingComments] = useState(true);
	const [isLoadingLogs, setIsLoadingLogs] = useState(true);

	// Fetch Full Task Details (Includes Attachments)
	const fetchFreshTaskData = useCallback(async () => {
		try {
			const res = await fetchTaskDetailsAction(task.id);
			if (res.success) setTaskData(res.data);
		} catch (error) {
			console.error('Error fetching task data:', error);
		}
	}, [task.id]);

	// Fetch Comments securely
	const fetchComments = useCallback(async () => {
		try {
			const res = await fetchCommentAction(task.id);
			if (res.success) setComments(res.data.data);
		} catch (error) {
			console.error('Error fetching comments:', error);
		} finally {
			setIsLoadingComments(false);
		}
	}, [task.id]);

	// Fetch Time Logs securely
	const fetchTimeLogs = useCallback(async () => {
		try {
			const res = await fetchTimeLogsAction(task.id);
			if (res.success) setTimeLogs(res.data);
		} catch (error) {
			console.error('Error fetching time logs:', error);
		} finally {
			setIsLoadingLogs(false);
		}
	}, [task.id]);

	// Initial load for all data
	useEffect(() => {
		if (task?.id) {
			fetchFreshTaskData();
			fetchComments();
			fetchTimeLogs();
		}
	}, [task?.id, fetchFreshTaskData, fetchComments, fetchTimeLogs]);

	const attachmentCount = taskData.attachments?.length || 0;

	return (
		<div className="bg-white rounded-3xl w-full mx-auto overflow-hidden border border-slate-200 shadow-xl flex flex-col md:max-h-[95vh]">
			<Tabs defaultValue="details" className="flex flex-col h-full">
				{/* Top Section: Header & Tab Triggers */}
				<div className="p-6 lg:p-8 bg-white border-b border-slate-200 shrink-0">
					<TaskHeader task={taskData} />

					<TabsList className="bg-transparent space-x-6 h-auto p-0 border-b-0 mt-8 overflow-x-auto hide-scrollbar flex-nowrap w-full justify-start">
						<TabsTrigger
							value="details"
							className="rounded-none border-0 border-b-2 border-transparent focus-visible:outline-none focus-visible:ring-0 data-[state=active]:border-b-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 font-semibold text-slate-500 data-[state=active]:text-indigo-600 whitespace-nowrap"
						>
							Details
						</TabsTrigger>

						<TabsTrigger
							value="attachments"
							className="rounded-none border-0 border-b-2 border-transparent focus-visible:outline-none focus-visible:ring-0 data-[state=active]:border-b-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 font-semibold text-slate-500 data-[state=active]:text-indigo-600 whitespace-nowrap"
						>
							Attachments ({attachmentCount})
						</TabsTrigger>

						<TabsTrigger
							value="comments"
							className="rounded-none border-0 border-b-2 border-transparent focus-visible:outline-none focus-visible:ring-0 data-[state=active]:border-b-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 font-semibold text-slate-500 data-[state=active]:text-indigo-600 whitespace-nowrap"
						>
							Comments ({isLoadingComments ? '...' : comments.length})
						</TabsTrigger>

						<TabsTrigger
							value="time"
							className="rounded-none border-0 border-b-2 border-transparent focus-visible:outline-none focus-visible:ring-0 data-[state=active]:border-b-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 font-semibold text-slate-500 data-[state=active]:text-indigo-600 whitespace-nowrap"
						>
							Time Logs ({isLoadingLogs ? '...' : timeLogs.length})
						</TabsTrigger>
					</TabsList>
				</div>

				{/* Bottom Section: Scrollable Tab Content */}
				<div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-slate-50/50 custom-scrollbar">
					<TabsContent value="details" className="m-0 outline-none animate-in fade-in duration-300">
						<div className="max-w-3xl">
							<h3 className="text-sm font-bold text-slate-900 mb-3">Description</h3>
							<div className="text-sm text-slate-600 leading-relaxed bg-white p-6 rounded-2xl border border-slate-100 shadow-sm whitespace-pre-wrap">
								{taskData.description || 'No description provided.'}
							</div>
						</div>
					</TabsContent>

					{/* New Attachments Tab */}
					<TabsContent value="attachments" className="m-0 outline-none animate-in fade-in duration-300">
						<div className="max-w-5xl">
							<TaskAttachmentsTab attachments={taskData.attachments || []} />
						</div>
					</TabsContent>

					<TabsContent value="comments" className="m-0 outline-none animate-in fade-in duration-300">
						<div className="max-w-3xl bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
							<CommentsSectionNew
								taskId={taskData.id}
								comments={comments}
								onCommentAdded={fetchComments}
							/>
						</div>
					</TabsContent>

					<TabsContent value="time" className="m-0 outline-none animate-in fade-in duration-300">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
							<LogTimeForm taskId={taskData.id} onTimeLogged={fetchTimeLogs} />

							<div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
								<TimeLogHistory logs={timeLogs} />
							</div>
						</div>
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
}
