import React, { useState, useEffect } from "react";
import useStyles from "../style";
import { AppBar, Grid, Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import CustomAlert from "../components/CustomAlert/CustomAlert";
import CustomBackdrop from "../components/CustomBackdrop/CustomBackdrop";

const UploadForm = () => {
	const classes = useStyles();

	const [query, setQuery] = useState({
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
			!query.className ||
			!query.subjectName ||
			!query.chapterName ||
			!query.topicName ||
			!query.video ||
			!query.pdf
		) {
			seterrMsg("Please fill all required fields");
			setbackdrop(false);
			seterrAlert(true);
			return;
		}

		try {
			await axios.post("https://zealacademy.herokuapp.com/upload", query);
		} catch (error) {
			finalRes = error.response.data;
		}
		setbackdrop(false);
		if (!finalRes) {
			setsuccMsg("Successfully uploaded");
			setsuccAlert(true);
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
						<h2 style={{ color: "#424E5D" }}>Upload Portal</h2>
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
							<TextField
								label="Class"
								style={{ margin: "10px 20px" }}
								fullWidth
								margin="normal"
								variant="outlined"
								value={query.className}
								onChange={(event) => {
									setQuery({
										...query,
										className: event.target.value,
									});
								}}
							/>
							<TextField
								label="Subject"
								style={{ margin: "10px 20px" }}
								fullWidth
								margin="normal"
								variant="outlined"
								value={query.subjectName}
								onChange={(event) => {
									setQuery({
										...query,
										subjectName: event.target.value,
									});
								}}
							/>
							<TextField
								label="Chapter"
								style={{ margin: "10px 20px" }}
								fullWidth
								margin="normal"
								variant="outlined"
								value={query.chapterName}
								onChange={(event) => {
									setQuery({
										...query,
										chapterName: event.target.value,
									});
								}}
							/>
							<TextField
								label="Topic"
								style={{ margin: "10px 20px" }}
								fullWidth
								margin="normal"
								variant="outlined"
								value={query.topicName}
								onChange={(event) => {
									setQuery({
										...query,
										topicName: event.target.value,
									});
								}}
							/>
							<TextField
								label="Video link"
								style={{ margin: "10px 20px" }}
								margin="normal"
								variant="outlined"
								fullWidth
								value={query.video}
								onChange={(event) => {
									setQuery({
										...query,
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
								value={query.pdf}
								onChange={(event) => {
									setQuery({
										...query,
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
