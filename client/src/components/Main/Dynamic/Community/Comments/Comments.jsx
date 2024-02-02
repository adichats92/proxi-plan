// Import necessary hooks and icons
import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import instance from '../../../../../axiosInstance';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// eslint-disable-next-line react/prop-types
const Comments = ({ postId, refresh, onRefreshRequested, currentUser }) => {
	const [comments, setComments] = useState([]);
	const [newCommentText, setNewCommentText] = useState('');
	const [editCommentData, setEditCommentData] = useState({ text: '' });
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	useEffect(() => {
		fetchComments();
	}, [refresh, postId]);

	const fetchComments = async () => {
		try {
			const response = await instance.get(`/api/posts/${postId}/comments`);
			setComments(response.data);
		} catch (error) {
			console.error('Error fetching comments:', error);
		}
	};

	console.log('Comments', comments);
	console.log('Updated Comments'), setComments;
	// Add a new comment
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

	// Update a comment
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

	// Delete a comment
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

	// Cancel edit
	const cancelEdit = () => {
		setIsEditModalOpen(false);
		setEditCommentData({ text: '' });
	};
	const handleStopPropagation = (event) => {
		event.stopPropagation();
	};

	return (
		<div>
			{/* New comment input */}
			<textarea
				value={newCommentText}
				onChange={(e) => setNewCommentText(e.target.value)}
				className='bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md border-sm w-full flex my-2'
				placeholder='Write a comment...'
			></textarea>
			<AddCircleOutlineIcon
				onClick={createComment}
				className='text-emerald-400 dark:text-emerald-600 hover:cursor-pointer hover:text-emerald-500 dark:hover:text-emerald-700'
			/>

			{/* Existing comments */}
			{comments.map((comment) => (
				<div key={comment._id}>
					<p>{comment.text}</p>
					{currentUser === comment.userId._id && (
						<div>
							<Tooltip title='Edit'>
								<EditIcon
									onClick={() => {
										setEditCommentData(comment);
										setIsEditModalOpen(true);
									}}
									className='text-sky-400 hover:text-teal-500 dark:hover:text-teal-700
                                dark:sky-600 hover:cursor-pointer'
								/>
							</Tooltip>
							<Tooltip title='Delete'>
								<DeleteOutlineIcon
									onClick={() => deleteComment(comment._id)}
									className='text-red-400 hover:text-red-500 dark:hover:text-red-700
                            dark:text-600 hover:cursor-pointer'
								/>
							</Tooltip>
						</div>
					)}
				</div>
			))}

			{/* Edit comment modal */}
			{isEditModalOpen && (
				<dialog
					open
					onClick={handleStopPropagation}
					className='z-50 absolute top-0 flex items-center justify-center w-full'
				>
					<div className='modal-box flex w-full'>
						<textarea
							value={editCommentData.text}
							name='text'
							onChange={(e) =>
								setEditCommentData({ ...editCommentData, text: e.target.value })
							}
							onClick={handleStopPropagation}
							className='bg-white dark:bg-gray-700 w-full me-3'
						></textarea>
						<div className='modal-action'>
							<TaskAltRoundedIcon
								onClick={saveEdit}
								className='text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-700
                            dark:emerald-600 hover:cursor-pointer'
							/>
							<ClearRoundedIcon
								onClick={cancelEdit}
								className='text-orange-400 hover:text-orange-500 dark:hover:text-orange-700
                            dark:text-orange hover:cursor-pointer'
							/>
						</div>
					</div>
				</dialog>
			)}
		</div>
	);
};

export default Comments;
