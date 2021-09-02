import React, { useState, useEffect } from "react";
import useStyles from "../style";
import { AppBar, Grid, Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import CustomAlert from "../components/CustomAlert/CustomAlert";
import CustomBackdrop from "../components/CustomBackdrop/CustomBackdrop";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Redirect } from "react-router-dom";

const UploadForm = () => {
	const classes = useStyles();
	let copy = [];
	useEffect(() => {
		async function fetch() {
			const response = await axios.get(
				"https://zealacademy.herokuapp.com/allClasses"
			);

			await setallClasses(response.data);
			copy = allClasses;
		}

		fetch();
	}, []);

	const [allClasses, setallClasses] = useState([
		{
			name: "",
			subjects: [
				{
					subjectName: "",
					chapters: [
						{
							chapterName: "",
							topics: [{ topicName: "", video: "", pdf: "" }],
						},
					],
				},
			],
		},
	]);
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

	const deleteEntry = async () => {
		let finalRes;
		if (!existing.className) {
			return;
		}
		// setbackdrop(true);

		try {
			await axios.post("https://zealacademy.herokuapp.com/delete", existing);
		} catch (error) {
			finalRes = error.response.data;
		}
		// setbackdrop(false);

		if (!finalRes) {
			setsuccMsg("Successfully Deleted");
			setsuccAlert(true);

			window.location.reload();
		} else {
			seterrMsg(finalRes);
			seterrAlert(true);
		}
	};

	const changeClass = async (event) => {
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

			let x = event.target.value;
			setQuery({ ...query, cI: x });

			setallSubjects(allClasses[x].subjects);

			setExisting({
				...existing,
				className: allClasses[x].name,
			});
		}
		setQuery({ ...query, className: event.target.value });
	};

	const changeSubject = async (event) => {
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

			let x = event.target.value;

			setQuery({ ...query, sI: x });
			setallChapters(allSubjects[x].chapters);
			setExisting({
				...existing,
				subjectName: allSubjects[x].subjectName,
			});
		}
		setQuery({
			...query,
			subjectName: event.target.value,
		});
	};

	const changeChapter = async (event) => {
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

			let x = event.target.value;

			setQuery({ ...query, chI: x });
			setallTopics(allChapters[x].topics);
			setExisting({
				...existing,
				chapterName: allChapters[x].chapterName,
			});
		}
		setQuery({
			...query,
			chapterName: event.target.value,
		});
	};

	const changeTopic = (event) => {
		if (event.target.value === "Create new") {
			setcreateTopic(true);

			setExisting({
				...existing,
				topicName: "",
			});
		} else {
			setcreateTopic(false);
			let x = event.target.value;
			setQuery({ ...query, tI: x });
			setExisting({
				...existing,
				topicName: allTopics[x].topicName,
			});
		}
		setQuery({
			...query,
			topicName: event.target.value,
		});
	};

	if (!window.sessionStorage.getItem("user")) {
		return <Redirect to="/authentication" />;
	}

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
							<FormControl
								variant="outlined"
								className={classes.formControl}
								style={{ margin: "10px 20px" }}
								fullWidth
							>
								<InputLabel>Select Class</InputLabel>
								<Select
									labelWidth={85}
									native
									value={query.className}
									onChange={changeClass}
								>
									<option aria-label="None" value="" />
									<option value="Create new">Create new</option>
									{allClasses.map((item, key) => (
										<option key={key} value={key}>
											{item.name}
										</option>
									))}
								</Select>
							</FormControl>
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
								<FormControl
									variant="outlined"
									className={classes.formControl}
									style={{ margin: "10px 20px" }}
									fullWidth
								>
									<InputLabel>Select Subject</InputLabel>
									<Select
										labelWidth={100}
										native
										value={query.subjectName}
										onChange={changeSubject}
									>
										<option aria-label="None" value="" />
										<option value="Create new">Create new</option>
										{allSubjects.map((item, key) => (
											<option key={key} value={key}>
												{item.subjectName}
											</option>
										))}
									</Select>
								</FormControl>
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
								<FormControl
									variant="outlined"
									className={classes.formControl}
									style={{ margin: "10px 20px" }}
									fullWidth
								>
									<InputLabel>Select Chapter</InputLabel>
									<Select
										labelWidth={105}
										native
										value={query.chapterName}
										onChange={changeChapter}
									>
										<option aria-label="None" value="" />
										<option value="Create new">Create new</option>
										{allChapters.map((item, key) => (
											<option key={key} value={key}>
												{item.chapterName}
											</option>
										))}
									</Select>
								</FormControl>
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
								<FormControl
									variant="outlined"
									className={classes.formControl}
									style={{ margin: "10px 20px" }}
									fullWidth
								>
									<InputLabel>Select Topic</InputLabel>
									<Select
										labelWidth={85}
										native
										value={query.topicName}
										onChange={changeTopic}
									>
										<option aria-label="None" value="" />
										<option value="Create new">Create new</option>
										{allTopics.map((item, key) => (
											<option key={key} value={key}>
												{item.topicName}
											</option>
										))}
									</Select>
								</FormControl>
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
								helperText="You don't need to fill this for deletion"
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
								helperText="You don't need to fill this for deletion"
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
									margin: "10px auto",
									width: "60%",
								}}
							>
								Upload
							</Button>

							<Button
								variant="contained"
								onClick={deleteEntry}
								style={{
									backgroundColor: "red",
									color: "white",
									margin: "10px auto",
									width: "60%",
								}}
							>
								Delete
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
