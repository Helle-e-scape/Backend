const Trap = require("../db/models/trapUser");

const TrapUserController = {};

TrapUserController.create = async (req, res) =>  {
    const { location, userId, nameTrap } = req.body;

    if (!location && userId) {
        return res.status(400).json({ message: "Missiing fields" });
    }

    exist = await Trap.findOne({ location });

    if (exist) {
        return res.status(400).json({ message: "Trap already exist" });
    }

    try {
        const trap = new Trap({ location, userId, nameTrap });
        await trap.save();
        return res.status(201).json({ message: "Trap created", trap });
    } catch (error) {
        return res.status(400).json({ message: "Internal server error" });
    }
};

TrapUserController.findAll = async (req, res) => {
    try {
        const trap = await Trap.find();
        return res.status(201).json({ trap });
        } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = TrapUserController;