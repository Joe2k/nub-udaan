const User = require('../models/User');
const Class = require('../models/Class');

exports.createClass = async (req, res) => {
	try {
		await Class.create(req.body);

		return res.status(200).send({
			message: 'Success!',
		});
	} catch (err) {
		return res.status(400).send({
			message: err,
		});
	}
};

exports.bookClass = async (req, res) => {
	try {
		// Find User
		let user = await User.findOne({ email: req.body.email });

		// Create User if it doesn't exist
		if (!user) {
			user = await User.create({ email: req.body.email });
		}

		let event = await Class.findOne({ _id: req.params.classId });

		if (!event) {
			return res.status(400).send({
				message: 'No event found. Check if event exists!',
			});
		}

		if (event.users.length < event.capacity) {
			event.users.push(user.id);
			user.confirmedClasses.push(event.id);

			event.save();
			user.save();

			return res.status(200).send({
				message: 'Successfully Booked Slot!',
			});
		} else {
			event.waitList.push(user.id);
			user.waitListedClasses.push(event.id);

			event.save();
			user.save();

			return res.status(200).send({
				message: 'Currently Wait listed!',
			});
		}
	} catch (err) {
		return res.status(400).send({
			message: err,
		});
	}
};

exports.cancelClass = async (req, res) => {
	try {
		// Find User
		let user = await User.findOne({ email: req.body.email });

		if (!user) {
			return res.status(400).send({
				message: 'No user found!',
			});
		}

		let event = await Class.findOne({ _id: req.params.classId });

		if (!event) {
			return res.status(400).send({
				message: 'No event found. Check if event exists!',
			});
		}

		await User.findOneAndUpdate(
			{ email: req.body.email },
			{ $pull: { confirmedClasses: event.id } }
		);
		await Class.findOneAndUpdate(
			{ _id: req.params.classId },
			{ $pull: { users: user.id } }
		);

		if (event.waitList.length > 0) {
			let topEvent = event.waitList[0];
			await Class.findOneAndUpdate(
				{ _id: req.params.classId },
				{
					$push: { users: topEvent },
					$pull: { waitList: topEvent },
				}
			);
		}

		return res.status(200).send({
			message: 'Success!',
		});
	} catch (err) {
		return res.status(400).send({
			message: err,
		});
	}
};
