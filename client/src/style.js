import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(
	(theme) => ({
		appBar: {
			borderRadius: 15,
			margin: "20px 0",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			padding: "20px",
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			border: "2px solid gray",
			borderRadius: "5px",
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
		root: {
			display: "flex",
			flexWrap: "wrap",
		},
		topicCell: {
			"&:hover": {
				background: "#efefef",
			},
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: "25ch",
		},
	}),
	{ index: 1 }
);
