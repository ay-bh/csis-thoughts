import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { initGA, logPageView } from "../utils/analytics";

export const metadata = {
	title: "Thoughts",
	description: "Seniors last words bits goa",
};

const layout = ({ children }) => {
	useEffect(() => {
		initGA();
		logPageView();
	}, []);
	return (
		<html>
			<body>
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>
					<main className="app">
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
};

export const fetchCache = "force-no-store";
export default layout;
