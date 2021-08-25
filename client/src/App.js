import "./App.css";
import { Helmet } from "react-helmet";
import ClassesTable from "./ClassesTable/ClassesTable";
import SubjectsTable from "./SubjectsTable/SubjectsTable";
import ChaptersTable from "./ChaptersTable/ChaptersTable";
import VideoPage from "./VideoPage/VideoPage";
import UploadForm from "./UploadForm/UploadForm";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					{localStorage.setItem("heading", "All Classes")}
					<Helmet>
						<title>{"All Classes | Study Material | ZeAl Academy"}</title>
					</Helmet>
					<ClassesTable />
				</Route>
				<Route path="/class">
					{localStorage.setItem("heading", "All Subjects")}
					<Helmet>
						<title>{"All Subjects | Study Material | ZeAl Academy"}</title>
					</Helmet>
					<SubjectsTable />
				</Route>
				<Route path="/subject">
					{localStorage.setItem("heading", "All Chapters")}
					<Helmet>
						<title>{"All Chapters | Study Material | ZeAl Academy"}</title>
					</Helmet>
					<ChaptersTable />
				</Route>
				<Route path="/view">
					<Helmet>
						<title>{"Study Material | ZeAl Academy"}</title>
					</Helmet>
					<VideoPage />
				</Route>
				<Route path="/upload">
					<Helmet>
						<title>{"Upload Portal | ZeAl Academy"}</title>
					</Helmet>
					<UploadForm />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
