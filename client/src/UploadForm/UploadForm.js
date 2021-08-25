import React, { useState, useEffect } from "react";
import useStyles from "../style";
import { AppBar, Grid, Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import CustomAlert from "../components/CustomAlert/CustomAlert";
import CustomBackdrop from "../components/CustomBackdrop/CustomBackdrop";

const UploadForm = () => {
	const classes = useStyles();

	const [allClasses, setallClasses] = useState([]);
	const [allSubjects, setallSubjects] = useState([]);
	const [allChapters, setallChapters] = useState([]);
	const [allTopics, setallTopics] = useState([]);

	const [createClass, setcreateClass] = useState(false);
	const [createSubject, setcreateSubject] = useState(false);
	const [createChapter, setcreateChapter] = useState(false);
	const [createTopic, setcreateTopic] = useState(false);

	const [selectClass, setselectClass] = useState(true);
	const [selectSubject, setselectSubject] = useState(true);
	const [selectChapter, setselectChapter] = useState(true);
	const [selectTopic, setselectTopic] = useState(true);

	useEffect(() => {
		async function fetch() {
			const response = await axios.get(
				"https://zealacademy.herokuapp.com/allClasses"
			);

			await setallClasses(response.data);
		}

		fetch();
	}, []);

	const [query, setQuery] = useState({
		className: "",
		subjectName: "",
		chapterName: "",
		topicName: "",
		video: "",
		pdf: "",
		cI: 0,
		sI: 0,
		chI: 0,
		tI: 0,
	});

	const [existing, setExisting] = useState({
		className: "",
		subjectName: "",
		chapterName: "",
		topicName: "",
		video: "",
		pdf: "",
	});

	const [succAlert, setsuccAlert] = useState(false);
	const [succMsg, setsuccMsg] = useState("");
	const [errAlert, seterrAlert] = useState(false);
	const [errMsg, seterrMsg] = useState("");

	const [backdrop, setbackdrop] = useState(false);

	let finalRes;
	const upload = async () => {
		console.log(existing);
		setbackdrop(true);
		if (
			!existing.className ||
			!existing.subjectName ||
			!existing.chapterName ||
			!existing.topicName ||
			!existing.video ||
			!existing.pdf
		) {
			seterrMsg("Please fill all required fields");
			setbackdrop(false);
			seterrAlert(true);
			return;
		}

		try {
			await axios.post("https://zealacademy.herokuapp.com/upload", existing);
		} catch (error) {
			finalRes = error.response.data;
		}
		setbackdrop(false);
		if (!finalRes) {
			setsuccMsg("Successfully uploaded");
			setsuccAlert(true);

			window.location.reload();
		} else {
			seterrMsg(finalRes);
			seterrAlert(true);
		}
	};

	return (
		<Container>
			<CustomBackdrop open={backdrop} />
			<Grid justifyContent="space-evenly" alignItems="stretch" container>
				<Grid item xs={12} sm={6}>
					<AppBar
						className={classes.appBar}
						position="static"
						color="inherit"
						style={{ width: "90%", margin: "20px auto" }}
					>
						<form
							className={classes.root}
							noValidate
							autoComplete="off"
							style={{ width: "90%" }}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									event.preventDefault();
									upload();
								}
							}}
						>
							{selectClass && (
								<TextField
									select
									label="Select class"
									style={{ margin: "10px 20px" }}
									fullWidth
									margin="normal"
									variant="outlined"
									value={query.className}
									onChange={(event) => {
										if (event.target.value === "Create new") {
											setcreateClass(true);
											setcreateSubject(true);
											setcreateChapter(true);
											setcreateTopic(true);
											setselectSubject(false);
											setselectChapter(false);
											setselectTopic(false);

											setExisting({
												...existing,
												className: "",
											});
										} else {
											setcreateClass(false);
											setcreateSubject(false);
											setcreateChapter(false);
											setcreateTopic(false);
											setselectSubject(true);
											setselectChapter(true);
											setselectTopic(true);

											setQuery({ ...query, cI: event.target.value });
											setallSubjects(allClasses[query.cI].subjects);
											setExisting({
												...existing,
												className: allClasses[query.cI].name,
											});
										}
										setQuery({
											...query,
											className: event.target.value,
										});
									}}
								>
									<MenuItem value="Create new">Create new</MenuItem>
									{allClasses.map((item, key) => (
										<MenuItem key={key} value={key}>
											{item.name}
										</MenuItem>
									))}
								</TextField>
							)}
							{createClass && (
								<TextField
									label="Enter class"
									style={{ margin: "10px 20px" }}
									fullWidth
									margin="normal"
									variant="outlined"
									value={existing.className}
									onChange={(event) => {
										setExisting({
											...existing,
											className: event.target.value,
										});
									}}
								/>
							)}
							{selectSubject && (
								<TextField
									select
									label="Select subject"
									style={{ margin: "10px 20px" }}
									fullWidth
									margin="normal"
									variant="outlined"
									value={query.subjectName}
									onChange={(event) => {
										if (event.target.value === "Create new") {
											setcreateSubject(true);
											setcreateChapter(true);
											setcreateTopic(true);
											setselectChapter(false);
											setselectTopic(false);

											setExisting({
												...existing,
												subjectName: "",
											});
										} else {
											setcreateSubject(false);
											setcreateChapter(false);
											setcreateTopic(false);
											setselectChapter(true);
											setselectTopic(true);

											setQuery({ ...query, sI: event.target.value });
											setallChapters(
												allClasses[query.cI].subjects[query.sI].chapters
											);
											setExisting({
												...existing,
												subjectName:
													allClasses[query.cI].subjects[query.sI].subjectName,
											});
										}
										setQuery({
											...query,
											subjectName: event.target.value,
										});
									}}
								>
									<MenuItem value="Create new">Create new</MenuItem>
									{allSubjects.map((item, key) => (
										<MenuItem key={key} value={key}>
											{item.subjectName}
										</MenuItem>
									))}
								</TextField>
							)}
							{createSubject && (
								<TextField
									label="Subject"
									style={{ margin: "10px 20px" }}
									fullWidth
									margin="normal"
									variant="outlined"
									value={existing.subjectName}
									onChange={(event) => {
										setExisting({
											...existing,
											subjectName: event.target.value,
										});
									}}
								/>
							)}
							{selectChapter && (
								<TextField
									select
									label="Select chapter"
									style={{ margin: "10px 20px" }}
									fullWidth
									margin="normal"
									variant="outlined"
									value={query.chapterName}
									onChange={(event) => {
										if (event.target.value === "Create new") {
											setcreateChapter(true);
											setcreateTopic(true);
											setselectTopic(false);

											setExisting({
												...existing,
												chapterName: "",
											});
										} else {
											setcreateChapter(false);
											setcreateTopic(false);
											setselectTopic(true);

											setQuery({ ...query, chI: event.target.value });
											setallTopics(
												allClasses[query.cI].subjects[query.sI].chapters[
													query.chI
												].topics
											);
											setExisting({
												...existing,
												chapterName:
													allClasses[query.cI].subjects[query.sI].chapters[
														query.chI
													].chapterName,
											});
										}
										setQuery({
											...query,
											chapterName: event.target.value,
										});
									}}
								>
									<MenuItem value="Create new">Create new</MenuItem>
									{allChapters.map((item, key) => (
										<MenuItem key={key} value={key}>
											{item.chapterName}
										</MenuItem>
									))}
								</TextField>
							)}
							{createChapter && (
								<TextField
									label="Chapter"
									style={{ margin: "10px 20px" }}
									fullWidth
									margin="normal"
									variant="outlined"
									value={existing.chapterName}
									onChange={(event) => {
										setExisting({
											...existing,
											chapterName: event.target.value,
										});
									}}
								/>
							)}
							{selectTopic && (
								<TextField
									select
									label="Select topic"
									style={{ margin: "10px 20px" }}
									fullWidth
									margin="normal"
									variant="outlined"
									value={query.topicName}
									onChange={(event) => {
										if (event.target.value === "Create new") {
											setcreateTopic(true);

											setExisting({
												...existing,
												topicName: "",
											});
										} else {
											setcreateTopic(false);
											setQuery({ ...query, tI: event.target.value });
											setExisting({
												...existing,
												topicName:
													allClasses[query.cI].subjects[query.sI].chapters[
														query.chI
													].topics[query.tI].topicName,
											});
										}
										setQuery({
											...query,
											topicName: event.target.value,
										});
									}}
								>
									<MenuItem value="Create new">Create new</MenuItem>
									{allTopics.map((item, key) => (
										<MenuItem key={key} value={key}>
											{item.topicName}
										</MenuItem>
									))}
								</TextField>
							)}
							{createTopic && (
								<TextField
									label="Topic"
									style={{ margin: "10px 20px" }}
									fullWidth
									margin="normal"
									variant="outlined"
									value={existing.topicName}
									onChange={(event) => {
										setExisting({
											...existing,
											topicName: event.target.value,
										});
									}}
								/>
							)}
							<TextField
								label="Video link"
								style={{ margin: "10px 20px" }}
								margin="normal"
								variant="outlined"
								fullWidth
								value={existing.video}
								onChange={(event) => {
									setExisting({
										...existing,
										video: event.target.value,
									});
								}}
							/>
							<TextField
								fullWidth
								label="Pdf link"
								style={{ margin: "10px 20px" }}
								margin="normal"
								variant="outlined"
								value={existing.pdf}
								onChange={(event) => {
									setExisting({
										...existing,
										pdf: event.target.value,
									});
								}}
							/>

							<Button
								variant="contained"
								onClick={upload}
								style={{
									backgroundColor: "#55C595",
									color: "white",
									margin: "0 auto",
									width: "50%",
								}}
							>
								Upload
							</Button>
						</form>
					</AppBar>
				</Grid>
			</Grid>
			<CustomAlert
				open={errAlert}
				onClose={() => seterrAlert(false)}
				severity="error"
				text={errMsg}
			/>
			<CustomAlert
				open={succAlert}
				onClose={() => setsuccAlert(false)}
				severity="success"
				text={succMsg}
			/>
		</Container>
	);
};

export default UploadForm;
