import Announcement from '../models/Announcement.js';

// GET all announcements
export async function getAllAnnouncements(req, res) {
    try {
        console.log("📢 Fetching all announcements");
        const announcements = await Announcement.find().sort({ date: -1 });
        res.json(announcements);
    } catch (err) {
        console.error("❌ Error fetching announcements:", err);
        res.status(500).json({ message: "Server error while fetching announcements." });
    }
}

// DELETE an announcement
export async function deleteAnnouncement(req, res) {
    console.log("🗑️ Attempting to delete announcement with ID:", req.params.id);
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
}

// POST create a new announcement
export async function createAnnouncement(req, res) {
    console.log("📨 Incoming request to create announcement:", req.body);
    const { title, content, author, category } = req.body;

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
            date: new Date()
        });

        const savedAnnouncement = await announcement.save();
        console.log("✅ Announcement saved:", savedAnnouncement);
        res.status(201).json(savedAnnouncement);
    } catch (err) {
        console.error("❌ Mongoose error:", err);
        res.status(500).json({ message: err.message });
    }
}
