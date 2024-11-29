import PostCard from "./PostCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete, handleLike }) => {
  return (
    <section className='w-full'>
      <h2 className='head_text text-left'>
      {name} <span className='blue_gradient'> Posts</span>
      </h2>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 post_layout'>
        {data?.map((post) => (
          <div className="mb-5" key={post._id}>
            <PostCard
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
              handleLike={() => handleLike && handleLike(post._id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Profile;