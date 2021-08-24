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

const ClassesTable = () => {
	const classes = useStyles();
	const [allClasses, setClass] = useState([]);

	useEffect(() => {
		async function fetch() {
			const response = await axios.get("http://localhost:5000/allClasses");

			await setClass(response.data);
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
					<h2 style={{ color: "#424E5D" }}>All classes</h2>
					<TableContainer component={Paper}>
						<Table className={classes.table}>
							<TableBody>
								{allClasses.length > 0 ? (
									allClasses.map((item, key) => (
										<TableRow key={key}>
											<TableCell
												component="th"
												scope="row"
												align="center"
												style={{ width: "50%" }}
											>
												{item.name}
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
														localStorage.setItem("currentClass", item.name);
														window.location = `/class/${item.name}`;
													}}
												>
													Open
												</Button>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell align="center">No classes to show</TableCell>
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

export default ClassesTable;
