import "@styles/globals.css";
import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Provider from "@components/Provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

export const dynamic = 'force-dynamic';

export const metadata = {
	title: "Psenti Chronicles",
	description: "A platform for BITS Seniors to share stories, memories, experiences, and more",
	icons: {
		icon: "/public/favicon.ico",
	},
};

const layout = ({ children }) => {
	return (
		<html>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
				<meta name="theme-color" content="#212121" />
			</head>
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

// export const fetchCache = "force-no-store";
export default layout;
