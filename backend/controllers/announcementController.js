const Announcement = require('../models/Announcement');

// GET all announcements
exports.getAllAnnouncements = async (req, res) => {
    try {
        console.log("📢 Fetching all announcements");
        const announcements = await Announcement.find().sort({ date: -1 });
        res.json(announcements);
    } catch (err) {
        console.error("❌ Error fetching announcements:", err);
        res.status(500).json({ message: "Server error while fetching announcements." });
    }
};

exports.deleteAnnouncement = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Announcement.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        res.json({ message: 'Announcement deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    console.log("🗑️ Attempting to delete announcement with ID:", req.params.id);

};


// POST create a new announcement
exports.createAnnouncement = async (req, res) => {
    console.log("📨 Incoming request to create announcement:", req.body);

    const { title, content, author, category } = req.body || {};

    // 💡 Defensive: Check if required fields are present
    if (!title || !content || !author || !category) {
        return res.status(400).json({
            message: "Missing required fields: title, content, author, and category are mandatory."
        });
    }

    try {
        const announcement = new Announcement({
            title,
            content,
            author,
            category,
            date: new Date()  // Optional: if you want to explicitly set `date`
        });

        const savedAnnouncement = await announcement.save();
        console.log("✅ Announcement saved:", savedAnnouncement);

        res.status(201).json(savedAnnouncement);
    }   catch (err) {
        console.error("❌ Mongoose error:", err);  // Show exact cause
        res.status(500).json({ message: err.message });
    }

};
