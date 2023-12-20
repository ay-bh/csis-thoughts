import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
export const metadata = {
	title: "Thoughts",
	description: "Seniors last words bits goa",
};

const layout = ({ children }) => {
	return (
		<html>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
			/>
			<Script id="google-analytics">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
        `}
			</Script>

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
				<SpeedInsights />
			</body>
		</html>
	);
};

export const fetchCache = "force-no-store";
export default layout;
