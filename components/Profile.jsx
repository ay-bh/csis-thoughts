import PostCard from "./PostCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h2 className='head_text text-left'>
      {name}'s <span className='blue_gradient'> Posts</span>
      </h2>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 post_layout'>
        {data.map((post) => (
          <div className="mb-5">
          <PostCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Profile;