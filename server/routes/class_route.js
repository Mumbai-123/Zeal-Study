import express from "express";
import Class from "../models/Class.js";

const router = express.Router();

router.get("/allClasses", async (req, res) => {
	try {
		const allClasses = await Class.find();
		res.json(allClasses);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

router.get("/allSubjects/:class", async (req, res) => {
	try {
		const allClasses = await Class.findOne({ name: req.params.class });
		res.json(allClasses.subjects);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

router.get("/allChapters/:currentClass/:currentSubject", async (req, res) => {
	try {
		const currentClass = await Class.findOne({ name: req.params.currentClass });
		let chapterList=[];
		currentClass.subjects.map((item) => {
			if (item.subjectName === req.params.currentSubject)
			{
				chapterList = item.chapters;
				return;
			}
		})

		res.json(chapterList);
		
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

router.post("/createClass", async (req, res) => {
	try {
		const newClass = new Class({
			name: req.body.className,
			subjects: [],
		});
		await newClass.save();
		res.status(200).json({ newClass });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

router.post("/createSubject", async (req, res) => {
	try {
		const existingClass = await Class.findOne({ name: req.body.className });
		existingClass.subjects.push({
			subjectName: req.body.subjectName,
			chapters: [],
		});
		await existingClass.save();
		res.status(200).json({ existingClass });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

router.post("/createChapter", async (req, res) => {
	try {
		const existingClass = await Class.findOne({ name: req.body.className });
		existingClass.subjects.map((item) => {
			if (item.subjectName === req.body.subjectName) {
				item.chapters.push({
					chapterName: req.body.chapterName,
					topics: [],
				});
			}
		});
		await existingClass.save();
		res.status(200).json({ existingClass });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

router.post("/createTopic", async (req, res) => {
	try {
		const existingClass = await Class.findOne({ name: req.body.className });
		existingClass.subjects.map((item) => {
			if (item.subjectName === req.body.subjectName) {
				item.chapters.map((value) => {
					if (value.chapterName == req.body.chapterName) {
						value.topics.push({
							topicName: req.body.topicName,
							video: req.body.video,
							pdf: req.body.pdf,
						});
					}
				});
			}
		});
		await existingClass.save();
		res.status(200).json({ existingClass });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});
export default router;
