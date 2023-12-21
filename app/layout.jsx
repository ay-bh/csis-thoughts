import "@styles/globals.css";
import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Provider from "@components/Provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

export const metadata = {
	title: "Thoughts",
	description: "A platform for BITS Goa Seniors",
	icons: {
		icon: "/public/favicon.ico",
	},
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
						<Footer/>
					</main>
				</Provider>
				<SpeedInsights />
			</body>
		</html>
	);
};

export const fetchCache = "force-no-store";
export default layout;
