// Import necessary hooks and icons
import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import instance from '../../../../../axiosInstance';
import { formatDistanceToNow, parseISO } from 'date-fns';
import SendIcon from '@mui/icons-material/Send';

// eslint-disable-next-line react/prop-types
const Comments = ({ postId, refresh, onRefreshRequested, currentUser }) => {
	const [comments, setComments] = useState([]);
	const [newCommentText, setNewCommentText] = useState('');
	const [editCommentData, setEditCommentData] = useState({ text: '' });
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	useEffect(() => {
		fetchComments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh, postId]);

	const fetchComments = async () => {
		try {
			const response = await instance.get(`/api/posts/${postId}/comments`);
			setComments(response.data);
		} catch (error) {
			console.error('Error fetching comments:', error);
		}
	};

	const createComment = async () => {
		if (!newCommentText.trim()) return;
		try {
			const response = await instance.post(`/api/posts/${postId}/comments`, {
				text: newCommentText,
			});
			setComments([...comments, response.data]);
			setNewCommentText('');
			onRefreshRequested();
		} catch (error) {
			console.error('Error creating comment:', error);
		}
	};

	const saveEdit = async () => {
		try {
			await instance.put(
				`/api/posts/${postId}/comments/${editCommentData._id}`,
				{ text: editCommentData.text }
			);
			const updatedComments = comments.map((comment) =>
				comment._id === editCommentData._id
					? { ...comment, text: editCommentData.text }
					: comment
			);
			setComments(updatedComments);
			onRefreshRequested();
			setIsEditModalOpen(false);
			setEditCommentData({ text: '' });
		} catch (error) {
			console.error('Error updating comment:', error);
		}
	};

	const deleteComment = async (commentId) => {
		try {
			await instance.delete(`/api/posts/${postId}/comments/${commentId}`);
			const updatedComments = comments.filter(
				(comment) => comment._id !== commentId
			);
			setComments(updatedComments);
			onRefreshRequested();
		} catch (error) {
			console.error('Error deleting comment:', error);
		}
	};

	const cancelEdit = () => {
		setIsEditModalOpen(false);
		setEditCommentData({ text: '' });
	};
	const handleStopPropagation = (event) => {
		event.stopPropagation();
	};

	const sortedComments = [...comments].sort(
		(a, b) =>
			new Date(b.createdAt || b.updatedAt) -
			new Date(a.createdAt || a.updatedAt)
	);

	const formatDateToNow = (dateString) => {
		const date = parseISO(dateString);
		return formatDistanceToNow(date, { addSuffix: true });
	};

	return (
		<div>
			<textarea
				value={newCommentText}
				onChange={(e) => setNewCommentText(e.target.value)}
				className='bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md border-sm w-full flex my-3'
				placeholder='Write a comment...'
			></textarea>
			<SendIcon
				onClick={createComment}
				className='text-emerald-400 transition-all duration-900 ease-in-out hover:cursor-pointer hover:text-blue-600 dark:hover:text-emerald-700 absolute top-24 right-8 pb-2'
				fontSize='large'
			/>

			{sortedComments.map((comment) => (
				<div
					key={comment._id}
					className='flex flex-row justify-between items-center mb-3 p-4 bg-cyan-100 dark:bg-gray-700 rounded'
				>
					<div>
						<p className='font-thin text-xs'>{comment.userId.userName}</p>
						<p>{comment.text}</p>
						<p className='font-thin text-xs'>
							{formatDateToNow(comment.createdAt)}
						</p>
					</div>
					{currentUser === comment.userId._id && (
						<div>
							<Tooltip title='Edit'>
								<EditIcon
									onClick={() => {
										setEditCommentData(comment);
										setIsEditModalOpen(true);
									}}
									className='text-sky-400 hover:text-teal-500 dark:hover:text-teal-700
                                dark:sky-600 hover:cursor-pointer mx-2'
								/>
							</Tooltip>
							<Tooltip title='Delete'>
								<DeleteOutlineIcon
									onClick={() => deleteComment(comment._id)}
									className='text-red-400 hover:text-red-500 dark:hover:text-red-700
                            dark:text-600 hover:cursor-pointer mx-2'
								/>
							</Tooltip>
						</div>
					)}
				</div>
			))}

			{isEditModalOpen && (
				<dialog
					open
					onClick={handleStopPropagation}
					className='z-50 absolute top-0 flex items-center justify-center backdrop-blur-sm w-full bg-transparent'
				>
					<div className='modal-box flex w-full bg-white bg-opacity-70 '>
						<textarea
							value={editCommentData.text}
							name='text'
							onChange={(e) =>
								setEditCommentData({ ...editCommentData, text: e.target.value })
							}
							onClick={handleStopPropagation}
							className='bg-white bg-opacity-70 text-gray-800 w-full m-3 mt-6 rounded'
						></textarea>
						<div className='modal-action'>
							<TaskAltRoundedIcon
								onClick={saveEdit}
								fontSize='large'
								className='text-emerald-400 hover:text-blue-600
                            hover:cursor-pointer absolute mx-2 top-2 right-12'
							/>
							<ClearRoundedIcon
								onClick={cancelEdit}
								fontSize='large'
								className='text-red-500 hover:text-orange-400 hover:cursor-pointer absolute mx-2 top-2 right-2'
							/>
						</div>
					</div>
				</dialog>
			)}
		</div>
	);
};

export default Comments;
