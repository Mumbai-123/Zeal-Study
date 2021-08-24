import React, { useState, useEffect } from "react";
import useStyles from "../style";
import { AppBar, Grid } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

const SubjectsTable = () => {
	const classes = useStyles();
	const [allSubjects, setSubjects] = useState([]);

	let stored = localStorage.getItem("currentClass");
	let saved = JSON.parse(stored);

	useEffect(() => {
		async function fetch() {
			const response = await axios.get(
				`https://zealacademy.herokuapp.com/allSubjects/${saved}`
			);

			await setSubjects(response.data);
		}

		fetch();
	}, []);

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
					<h2 style={{ color: "#424E5D" }}>All subjects</h2>
					<TableContainer component={Paper}>
						<Table className={classes.table}>
							<TableBody>
								{allSubjects.length > 0 ? (
									allSubjects.map((item, key) => (
										<TableRow key={key}>
											<TableCell
												component="th"
												scope="row"
												align="center"
												style={{ width: "50%" }}
											>
												{item.subjectName}
											</TableCell>
											<TableCell align="center">
												<Button
													size="medium"
													variant="contained"
													style={{
														backgroundColor: "#55C595",
														color: "#ffffff",
													}}
													onClick={() => {
														localStorage.setItem(
															"currentSubject",
															item.subjectName
														);
														window.location.pathname = `/subject/${item.subjectName}`;
													}}
												>
													Open
												</Button>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell align="center">No subjects to show</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</AppBar>
			</Grid>
		</Grid>
	);
};

export default SubjectsTable;
