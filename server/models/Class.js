import mongoose from "mongoose";
const Schema = mongoose.Schema;

const classesSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	subjects: [
		{
			subjectName: String,
			chapters: [
				{
					chapterName: String,
					topics: [{ topicName: String, video: String, pdf: String }],
				},
			],
		},
	],
});

const Class = mongoose.model("Class", classesSchema);
export default Class;
