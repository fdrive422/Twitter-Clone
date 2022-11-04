import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";

const Home: NextPage = () => {
	return (
		<div className="mx-auto lg:max-w-6xl max-h-screen overflow-hidden">
			<Head>
				<title>Twitter 2.0</title>
			</Head>

			<main className="grid grid-cols-9">
				<Sidebar />

				<Feed />

				<Widgets />
			</main>
		</div>
	);
};

export default Home;
