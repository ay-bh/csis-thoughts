import Feed from "@components/Feed";

export const dynamic = 'force-dynamic';

const Home = () => {
	return (
		<section className="w-full flex-center flex-col">
			<h1 className="head_text text-center">
				<i>psenti</i>
				<span className="blue_gradient text-center"> chronicles</span>
			</h1>
			<p className="desc text-center">
				Weaving Memories into Timeless Stories
			</p>
			<Feed/>
		</section>
	);
};

export default Home;
