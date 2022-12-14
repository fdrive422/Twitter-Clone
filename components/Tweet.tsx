import React, { useEffect, useState } from "react";
import { Comment, CommentBody, Tweet } from "../typings";
import TimeAgo from "react-timeago";
import {
	ChatBubbleLeftRightIcon,
	HeartIcon,
	ArrowsRightLeftIcon,
	ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { fetchComments } from "../utils/fetchComments";
import toast from "react-hot-toast";

interface Props {
	tweet: Tweet;
}

function Tweet({ tweet }: Props) {
	const { data: session } = useSession();

	const [comments, setComments] = useState<Comment[]>([]);
	const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
	const [input, setInput] = useState<string>("");
	const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);

	const refreshComments = async () => {
		const comments: Comment[] = await fetchComments(tweet._id);
		setComments(comments);
	};

	useEffect(() => {
		refreshComments();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const commentToast = toast.loading("Posting Reply...");

		// reply to tweet logic
		const comment: CommentBody = {
			comment: input,
			tweetId: tweet._id,
			username: session?.user?.name || "Unknown User",
			profileImg:
				session?.user?.image || "https://links.papareact.com/gll",
		};

		const result = await fetch(`/api/addComment`, {
			body: JSON.stringify(comment),
			method: "POST",
		});

		console.log("WOOHOO we made it", result);
		toast.success("Reply Posted!", {
			id: commentToast,
		});

		setInput("");
		setCommentBoxVisible(false);
		refreshComments();
	};

	return (
		<div
			key={tweet._id}
			className="flex flex-col space-x-3 border-y p-5 border-gray-100">
			<div className="flex space-x-3">
				<img
					className="h-10 w-10 rounded-full object-cover"
					src={tweet.profileImg || "https://links.papareact.com/gll"}
					alt={tweet.username}
				/>

				<div>
					<div className="flex items-center space-x-1">
						<p className="mr-1 font-bold">{tweet.username}</p>
						<p className="hidden text-sm text-gray-500 sm:inline">
							{" "}
							@{tweet.username
								.replace(/\s+/g, "")
								.toLowerCase()}{" "}
							???
						</p>

						<TimeAgo
							className="text-sm text-gray-500"
							date={tweet._createdAt}
						/>
					</div>
					<p className="pt-1">{tweet.text}</p>

					{tweet.image && (
						<img
							src={tweet.image}
							alt={tweet.text}
							className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
						/>
					)}
				</div>
			</div>

			<div className="flex justify-between mt-5">
				<div
					onClick={() =>
						session
							? setCommentBoxVisible(!commentBoxVisible)
							: setUserLoggedIn(false)
					}
					className="flex cursor-pointer items-center space-x-3 text-gray-400">
					<ChatBubbleLeftRightIcon className="h-5 w-5" />
					<p>{comments?.length > 0 ? comments.length : ""}</p>
				</div>

				<div className="flex cursor-pointer items-center space-x-3 text-gray-400">
					<ArrowsRightLeftIcon className="h-5 w-5" />
				</div>

				<div className="flex cursor-pointer items-center space-x-3 text-gray-400">
					<HeartIcon className="h-5 w-5" />
				</div>

				<div className="flex cursor-pointer items-center space-x-3 text-gray-400">
					<ArrowUpTrayIcon className="h-5 w-5" />
				</div>
			</div>

			{!userLoggedIn && (
				<p className="mt-2 pl2 text-rose-600">
					You must sign in first...
				</p>
			)}
			{commentBoxVisible && (
				<form onSubmit={handleSubmit} className="mt-3 flex space-x-3">
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
						type="text"
						placeholder="write a reply..."
					/>
					<button
						disabled={!input || input.trim().length === 0}
						type="submit"
						className="text-twitter disabled:text-gray-200">
						Post
					</button>
				</form>
			)}

			{comments?.length > 0 && (
				<div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
					{comments.map((comment) => (
						<div
							key={comment._id}
							className="relative flex space-x-2">
							<hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
							<img
								src={comment.profileImg}
								className="mt-2 h-7 w-7 object-cover rounded-full"
								alt={comment.username}
							/>
							<div>
								<div className="flex items-center space-x-1">
									<p className="mr-1 font-bold">
										{comment.username}
									</p>
									<p className="hidden text-sm text-gray-500 lg:inline">
										@
										{comment.username
											.replace(/\s+/g, "")
											.toLowerCase()}{" "}
										???
									</p>

									<TimeAgo
										className="text-sm text-gray-500"
										date={comment._createdAt}
									/>
								</div>
								<p>{comment.comment}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Tweet;
