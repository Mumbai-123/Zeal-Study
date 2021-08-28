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
		let chapterList = [];
		currentClass.subjects.map((item) => {
			if (item.subjectName === req.params.currentSubject) {
				chapterList = item.chapters;
				return;
			}
		});

		res.json(chapterList);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

router.post("/upload", async (req, res) => {
	try {
		const request = {
			className: req.body.className,
			subjectName: req.body.subjectName,
			chapterName: req.body.chapterName,
			topicName: req.body.topicName,
			video: req.body.video,
			pdf: req.body.pdf,
		};

		const existingClass = await Class.findOne({ name: request.className });

		if (!existingClass) {
			const newClass = new Class({
				name: request.className,
				subjects: [
					{
						subjectName: request.subjectName,
						chapters: [
							{
								chapterName: request.chapterName,
								topics: [
									{
										topicName: request.topicName,
										video: request.video,
										pdf: request.pdf,
									},
								],
							},
						],
					},
				],
			});

			await newClass.save();
			res.status(200).json({ newClass });
			return;
		}

		let existSubject = false;
		let iS;

		existingClass.subjects.map((item, key) => {
			if (item.subjectName === request.subjectName) {
				existSubject = true;
				iS = key;
				return;
			}
		});

		if (!existSubject) {
			existingClass.subjects.push({
				subjectName: request.subjectName,
				chapters: [
					{
						chapterName: request.chapterName,
						topics: [
							{
								topicName: request.topicName,
								video: request.video,
								pdf: request.pdf,
							},
						],
					},
				],
			});

			await existingClass.save();
			res.status(200).json({ existingClass });
			return;
		}

		let existChapter = false;
		let iC;

		existingClass.subjects[iS].chapters.map((item, key) => {
			if (item.chapterName === request.chapterName) {
				existChapter = true;
				iC = key;
				return;
			}
		});

		if (!existChapter) {
			existingClass.subjects[iS].chapters.push({
				chapterName: request.chapterName,
				topics: [
					{
						topicName: request.topicName,
						video: request.video,
						pdf: request.pdf,
					},
				],
			});

			await existingClass.save();
			res.status(200).json({ existingClass });
			return;
		}

		let existTopic = false;
		let iT;

		existingClass.subjects[iS].chapters[iC].topics.map((item, key) => {
			if (item.topicName === request.topicName) {
				existTopic = true;
				iT = key;
				return;
			}
		});

		if (!existTopic) {
			existingClass.subjects[iS].chapters[iC].topics.push({
				topicName: request.topicName,
				video: request.video,
				pdf: request.pdf,
			});

			await existingClass.save();
			res.status(200).json({ existingClass });
			return;
		}

		existingClass.subjects[iS].chapters[iC].topics[iT] = {
			topicName: request.topicName,
			video: request.video,
			pdf: request.pdf,
		};

		await existingClass.save();
		res.status(200).json({ existingClass });
		return;
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

router.post("/delete", async (req, res) => {
	// console.log(req.body);
	try {
		const existingClass = await Class.findOne({ name: req.body.className });

		if (!existingClass) {
			res.status(404).send("No such entry exists");
			return;
		}

		if (!req.body.subjectName) {
			const deleted = await Class.deleteOne({ name: req.body.className });
			// Class.save();
			res.status(200).json(deleted);
			return;
		}

		let isSubject = false;
		let iS;

		existingClass.subjects.map((item, key) => {
			if (item.subjectName === req.body.subjectName) {
				isSubject = true;
				iS = key;
				return;
			}
		});

		if (!isSubject) {
			res.status(404).send("No such entry exists");
			return;
		}

		if (!req.body.chapterName) {
			existingClass.subjects.splice(iS, 1);
			await existingClass.save();
			res.status(200).json(existingClass);
			return;
		}

		let isChapter = false;
		let iC;

		existingClass.subjects[iS].chapters.map((item, key) => {
			if (item.chapterName === req.body.chapterName) {
				isChapter = true;
				iC = key;
				return;
			}
		});

		if (!isChapter) {
			res.status(404).send("No such entry exists");
			return;
		}

		if (!req.body.topicName) {
			existingClass.subjects[iS].chapters.splice(iC, 1);
			await existingClass.save();
			res.status(200).json(existingClass);
			return;
		}

		let isTopic = false;
		let iT;

		existingClass.subjects[iS].chapters[iC].topics.map((item, key) => {
			if (item.topicName === req.body.topicName) {
				isTopic = true;
				iT = key;
				return;
			}
		});

		if (!isTopic) {
			res.status(404).send("No such entry exists");
			return;
		}

		existingClass.subjects[iS].chapters[iC].topics.splice(iT, 1);
		await existingClass.save();
		res.status(200).json(existingClass);
	} catch (err) {}
});

export default router;
