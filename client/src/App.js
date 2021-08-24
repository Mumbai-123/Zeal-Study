import "./App.css";
import ClassesTable from "./ClassesTable/ClassesTable";
import SubjectsTable from "./SubjectsTable/SubjectsTable";
import ChaptersTable from "./ChaptersTable/ChaptersTable";
import VideoPage from "./VideoPage/VideoPage";
import UploadForm from "./UploadForm/UploadForm";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<ClassesTable />
				</Route>
				<Route path="/class">
					<SubjectsTable />
				</Route>
				<Route path="/subject">
					<ChaptersTable />
				</Route>
				<Route path="/view">
					<VideoPage />
				</Route>
				<Route path="/upload">
					<UploadForm />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
