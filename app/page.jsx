import Feed from "@components/Feed";

const Home = () => {
	return (
		<section className="w-full flex-center flex-col">
			<h1 className="head_text text-center">Seniors'
			{/* <br className="max-md:hidden" /> */}
			<span className="blue_gradient text-center"> Memoir</span>
			</h1>
			<p className="desc text-center">
			A memory wall for Graduating Seniors to share their reflections as they depart and embark on the next chapter of their lives
			</p>
			<Feed/>
		</section>
	);
};

export default Home;
