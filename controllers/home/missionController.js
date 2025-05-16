const Mission = require("../../models/home/Mission");

exports.createMission = async (req, res) => {
  try {
    const mission = new Mission(req.body);
    await mission.save();
    res.status(201).json(mission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMissions = async (req, res) => {
  try {
    const missions = await Mission.find();
    res.status(200).json(missions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMission = async (req, res) => {
  try {
    const updated = await Mission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMission = async (req, res) => {
  try {
    await Mission.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Mission entry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
