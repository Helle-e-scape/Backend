const Trap = require("../db/models/trapUser");

const TrapUserController = {};

TrapUserController.create = async (req, res) => {
    const { nameTrap, location, userId, roomId } = req.body;

    if (!location && userId && nameTrap && roomId) {
        return res.status(400).json({ message: "Missiing fields" });
    }

    exist = await Trap.findOne({ location });

    if (exist) {
        return res.status(400).json({ message: "Trap already exist" });
    }

    try {
        const trap = new Trap({ 
            nameTrap, 
            location, 
            userId, 
            roomId 
        });
        await trap.save();
        return res.status(201).json({ message: "Trap created", trap });
    } catch (error) {
        return res.status(400).json({ message: "Internal server error" });
    }
};

TrapUserController.findAllByIdRoom = async (req, res) => {
    const { _id } = req.body;

    if (!_id) { 
        return res.status(400).json({ message: "Missing fields" });
    }

    try {
        const trap = await Trap.find({ roomId: _id });
        return res.status(201).json({ trap });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

TrapUserController.update = async (req, res) => {
    const { _id, location } = req.body;

    if (!_id && location) {
        return res.status(400).json({ message: "Missiing fields" });
    }

    exist = await Trap.findOne({ _id });

    if (!exist) {
        return res.status(400).json({ message: "Trap not exist" });
    }

    try {
        const trap = await Trap.updateOne({ _id, location });
        return res.status(201).json({ trap });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = TrapUserController;