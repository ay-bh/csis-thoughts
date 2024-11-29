import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
	return (
		<section className="w-full max-w-full flex-start flex-col">
			<h1 className="head_text text-left">
				{type} <span className="blue_gradient">Message</span>
			</h1>
			<p className="mt-5 text-sm text-gray-400 md:text-lg max-w-2xl text-left max-w-xl">
				Share your amazing journey and learning with your juniors. Let your fond memories take over and make you feel nostalgic. You can write a few short messages or one long one, whichever you prefer. This will be incredibly helpful for your juniors. You can decide to answer questions like, "What will you miss the most about college?" and "Now that you look back on everything, what would you change and why?" Just reminisce about all the good times, the friends you've made, the people you've met, and the places you've been to, and share all of that here.
			</p>

			<form
				onSubmit={handleSubmit}
				className="mt-10 w-full max-w-2xl flex flex-col gap-7 bg-zinc-900 glassmorphism"
			>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-100">
						Your message
					</span>

					<textarea
						value={post.post}
						onChange={(e) => setPost({ ...post, post: e.target.value })}
						placeholder="Write your post here..."
						required
						className="form_textarea"
					/>
					{post.post.length < 200 && (
						<span className="text-gray-400 text-sm">
							{200 - post.post.length} more characters needed
						</span>
					)}
				</label>

				<div className="flex-end mx-3 mb-5 gap-4">
					<label className="flex items-center mr-auto space-x-1 text-gray-100 text-left">
						<input
							type="checkbox"
							checked={post.anon}
							onChange={() => setPost({ ...post, anon: !post.anon })}
							className="form-checkbox"
						/>
						<span className="text-sm">Anonymous</span>
					</label>

					<Link href="/" className="text-gray-100 text-sm">
						Cancel
					</Link>

					<button
						type="submit"
						disabled={submitting || post.post.length < 200}
						className="px-5 py-1.5 text-sm bg-zinc-700 rounded text-white disabled:opacity-50"
					>
						{submitting ? `Sending...` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
