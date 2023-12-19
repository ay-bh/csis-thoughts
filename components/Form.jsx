import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
      {type} <span className='blue_gradient'>Message</span>
      </h1>
      <p className='desc text-left max-w-md'>
        Share your amazing journey and learning with your juniors, and let your nostalgia get the better of you. You can post multiple small messages or bigger one. Your choice. This will help your juniors immensely
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 bg-zinc-900 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-100'>
            Your message
          </span>

          <textarea
            value={post.post}
            onChange={(e) => setPost({ ...post, post: e.target.value })}
            placeholder='Write your post here...'
            required
            className='form_textarea'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-100 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-zinc-700 rounded text-white'
          >
            {submitting ? `Sending...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;