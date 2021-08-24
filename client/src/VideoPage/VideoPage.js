import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import useStyles from "../style";

const ReverseString = (str) => [...str].reverse().join("");

const VideoPage = () => {
	const classes = useStyles();

	let stored = localStorage.getItem("currentTopic");
	let saved = JSON.parse(stored);

	let link = "";

	let temp = saved.video;
	temp = ReverseString(temp);
	let i = 0;

	while (true) {
		if (temp[i] === "/" || temp[i] === "=") {
			break;
		}
		link += temp[i];
		i++;
	}
	link = ReverseString(link);

	return (
		<Grid container justifyContent="space-evenly" alignItems="center">
			<Grid
				item
				xs={12}
				md={6}
				container
				justifyContent="space-evenly"
				alignItems="center"
			>
				<Typography
					variant="h4"
					style={{ margin: "20px", color: "#424E5D" }}
				>
					Video
				</Typography>
				<iframe
					width="90%"
					height="315"
					src={"https://www.youtube.com/embed/" + link}
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
					style={{ minWidth: "300px" }}
					align="center"
				></iframe>
				<Typography variant="h6" style={{ margin: "20px" }}>
					<a href={saved.pdf}>PDF Link</a>
				</Typography>
			</Grid>
		</Grid>
	);
};

export default VideoPage;
