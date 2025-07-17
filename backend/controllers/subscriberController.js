// backend/controllers/subscriberController.js
const Subscriber = require('../models/Subscriber');

// @desc    Get all subscribers (for admin view)
// @route   GET /api/subscribers
// @access  Private (Admin only) - for future implementation
exports.getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Add a new subscriber
// @route   POST /api/subscribers
// @access  Public
exports.addSubscriber = async (req, res) => {
    const { email } = req.body;

    // Basic validation
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Check if email already exists
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(409).json({ message: 'Email already subscribed' }); // 409 Conflict
        }

        // Create new subscriber
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        res.status(201).json({ message: 'Successfully subscribed!', subscriber: newSubscriber });
    } catch (err) {
        // Handle validation errors or other database errors
        res.status(400).json({ message: err.message });
    }
};

// @desc    Remove a subscriber (e.g., for unsubscribe feature or admin)
// @route   DELETE /api/subscribers/:id
// @access  Private (or Public for unsubscribe link) - for future implementation
exports.removeSubscriber = async (req, res) => {
    try {
        const deletedSubscriber = await Subscriber.findByIdAndDelete(req.params.id);
        if (!deletedSubscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        res.json({ message: 'Subscriber removed successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
