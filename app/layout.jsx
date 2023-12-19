import "@styles/globals.css";
import { Children } from "react";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
export const metadata = {
	title: "Thoughts",
	description: "Seniors last words bits goa",
};

const layout = ({ children }) => {
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

export const fetchCache = 'force-no-store'
export default layout;
