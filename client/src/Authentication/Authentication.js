import React, { useState } from "react";
import useStyles from "../style";
import { AppBar, Grid, Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import CustomAlert from "../components/CustomAlert/CustomAlert";
import CustomBackdrop from "../components/CustomBackdrop/CustomBackdrop";

const Authentication = () => {
	const classes = useStyles();

	const [errAlert, seterrAlert] = useState(false);
	const [errMsg, seterrMsg] = useState("");

	const [backdrop, setbackdrop] = useState(false);

	const [passwordVisible, setPasswordVisible] = useState(false);
	const [oldVisible, setoldVisible] = useState(false);
	const [newVisible, setnewVisible] = useState(false);
	const [newVisible2, setnewVisible2] = useState(false);

	const [changePassword, setchangePassword] = useState(false);
	const [query, setQuery] = useState({
		username: "",
		password: "",
	});

	const [queryforChange, setqueryforChange] = useState({
		username: "",
		oldPassword: "",
		newPassword: "",
		newPassword2: "",
	});

	const login = async () => {
		if (!query.username || !query.password) {
			return;
		}

		setbackdrop(true);

		let response;

		try {
			await axios.post("https://zealacademy.herokuapp.com/auth/login", query);
		} catch (error) {
			response = error.response;
		}

		setbackdrop(false);

		if (!response) {
			window.sessionStorage.setItem("user", query.username);
			window.location = "https://zealstudy.netlify.app/upload";
		} else if (response.data.username) {
			seterrMsg(response.data.username);
			seterrAlert(true);
		} else if (response.data.password) {
			seterrMsg(response.data.password);
			seterrAlert(true);
		}
	};

	const change = async () => {
		if (
			!queryforChange.username ||
			!queryforChange.oldPassword ||
			!queryforChange.newPassword ||
			!queryforChange.newPassword2
		) {
			return;
		}

		setbackdrop(true);

		let response;

		try {
			await axios.post(
				"https://zealacademy.herokuapp.com/auth/changePassword",
				queryforChange
			);
		} catch (error) {
			response = error.response;
		}

		setbackdrop(false);

		console.log(response);

		if (!response) {
			window.location.reload();
		} else if (response.data.username) {
			seterrMsg(response.data.username);
			seterrAlert(true);
		} else if (response.data.password) {
			seterrMsg(response.data.password);
			seterrAlert(true);
		}
	};

	return (
		<Grid container justifyContent="space-evenly" alignItems="stretch">
			<Grid
				item
				xs={12}
				sm={6}
				justifyContent="space-evenly"
				alignItems="stretch"
				container
			>
				<AppBar
					className={classes.appBar}
					position="static"
					color="inherit"
					style={{ width: "90%" }}
				>
					<CustomBackdrop open={backdrop} />
					{!changePassword && <h2>Login</h2>}
					{changePassword && <h2>Change Password</h2>}
					{!changePassword && (
						<form
							className={classes.root}
							noValidate
							autoComplete="off"
							style={{ width: "90%" }}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									event.preventDefault();
									login();
								}
							}}
						>
							<TextField
								label="Username"
								style={{ margin: "10px 20px" }}
								fullWidth
								margin="normal"
								variant="outlined"
								value={query.username}
								onChange={(event) => {
									setQuery({
										...query,
										username: event.target.value,
									});
								}}
							/>

							<FormControl
								variant="outlined"
								style={{ margin: "10px 20px" }}
								fullWidth
								margin="normal"
							>
								<InputLabel>Password</InputLabel>
								<OutlinedInput
									variant="outlined"
									type={passwordVisible ? "text" : "password"}
									value={query.password}
									onChange={(event) => {
										setQuery({
											...query,
											password: event.target.value,
										});
									}}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => setPasswordVisible(!passwordVisible)}
												edge="end"
											>
												{passwordVisible ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
									labelWidth={70}
								/>
								<small
									onClick={() => setchangePassword(true)}
									style={{ cursor: "pointer" }}
								>
									Change password?
								</small>
							</FormControl>

							<Button
								variant="contained"
								onClick={login}
								style={{
									backgroundColor: "#55C595",
									color: "white",
									margin: "0 auto",
									width: "50%",
								}}
							>
								Login
							</Button>
						</form>
					)}
					{changePassword && (
						<form
							className={classes.root}
							noValidate
							autoComplete="off"
							style={{ width: "90%" }}
							onKeyDown={(event) => {
								if (event.key === "Enter") {
									event.preventDefault();
									change();
								}
							}}
						>
							<TextField
								label="Username"
								style={{ margin: "10px 20px" }}
								fullWidth
								margin="normal"
								variant="outlined"
								value={queryforChange.username}
								onChange={(event) => {
									setqueryforChange({
										...queryforChange,
										username: event.target.value,
									});
								}}
							/>

							<FormControl
								variant="outlined"
								style={{ margin: "10px 20px" }}
								fullWidth
								margin="normal"
							>
								<InputLabel>Old password</InputLabel>
								<OutlinedInput
									variant="outlined"
									type={oldVisible ? "text" : "password"}
									value={queryforChange.oldPassword}
									onChange={(event) => {
										setqueryforChange({
											...queryforChange,
											oldPassword: event.target.value,
										});
									}}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => setoldVisible(!oldVisible)}
												edge="end"
											>
												{oldVisible ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
									labelWidth={100}
								/>
							</FormControl>

							<FormControl
								variant="outlined"
								style={{ margin: "10px 20px" }}
								fullWidth
								margin="normal"
							>
								<InputLabel>New password</InputLabel>
								<OutlinedInput
									variant="outlined"
									type={newVisible ? "text" : "password"}
									value={queryforChange.newPassword}
									onChange={(event) => {
										setqueryforChange({
											...queryforChange,
											newPassword: event.target.value,
										});
									}}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => setnewVisible(!newVisible)}
												edge="end"
											>
												{newVisible ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
									labelWidth={105}
								/>
							</FormControl>

							<FormControl
								variant="outlined"
								style={{ margin: "10px 20px" }}
								fullWidth
								margin="normal"
							>
								<InputLabel>Confirm new password</InputLabel>
								<OutlinedInput
									variant="outlined"
									type={newVisible2 ? "text" : "password"}
									value={queryforChange.newPassword2}
									onChange={(event) => {
										setqueryforChange({
											...queryforChange,
											newPassword2: event.target.value,
										});
									}}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => setnewVisible2(!newVisible2)}
												edge="end"
											>
												{newVisible2 ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
									labelWidth={163}
								/>
							</FormControl>

							<Button
								variant="contained"
								onClick={change}
								style={{
									backgroundColor: "#55C595",
									color: "white",
									margin: "20px auto 0",
									width: "60%",
								}}
							>
								Change
							</Button>
							<Button
								variant="contained"
								onClick={() => setchangePassword(false)}
								style={{
									backgroundColor: "red",
									color: "white",
									margin: "10px auto",
									width: "60%",
								}}
							>
								Cancel
							</Button>
						</form>
					)}
					<CustomAlert
						open={errAlert}
						onClose={() => seterrAlert(false)}
						severity="error"
						text={errMsg}
					/>
				</AppBar>
			</Grid>
		</Grid>
	);
};

export default Authentication;
