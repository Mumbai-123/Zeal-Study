import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStyles from "../style";
import { AppBar, Grid } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useRowStyles = makeStyles({
	root: {
		"& > *": {
			borderBottom: "unset",
		},
	},
});

function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	const classes = useRowStyles();
	const classes2 = useStyles();

	return (
		<React.Fragment>
			<TableRow className={classes.root}>
				<TableCell align="centre" style={{ width: "0" }}>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell align="centre" component="th" scope="row">
					<Typography>{row.chapterName}</Typography>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box margin={1}>
							<Typography
								variant="h6"
								gutterBottom
								component="div"
								style={{ color: "#424E5D" }}
							>
								Topics
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableBody>
									{row.topics.map((item, key) => (
										<TableRow key={key} className={classes2.topicCell}>
											<TableCell
												component="th"
												scope="row"
												style={{ cursor: "pointer" }}
												onClick={() => {
													localStorage.setItem(
														"currentTopic",
														JSON.stringify(item)
													);
													window.location.pathname = `https://zealstudy.netlify.app/view/${item._id}`;
												}}
											>
												{item.topicName}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

const ChaptersTable = () => {
	const classes = useStyles();
	const [allChapters, setallChapters] = useState([]);

	let currentSubject = localStorage.getItem("currentSubject");
	let currentClass = localStorage.getItem("currentClass");

	useEffect(() => {
		async function fetch() {
			const response = await axios.get(
				`https://zealacademy.herokuapp.com/allChapters/${currentClass}/${currentSubject}`
			);

			await setallChapters(response.data);
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
					<h2 style={{ color: "#424E5D" }}>All chapters</h2>
					<TableContainer component={Paper}>
						<Table className={classes.table}>
							<TableBody>
								{allChapters.length > 0 ? (
									allChapters.map((item, key) => <Row key={key} row={item} />)
								) : (
									<TableRow>
										<TableCell align="center">No chapters to show</TableCell>
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

export default ChaptersTable;
