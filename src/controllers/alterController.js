exports.triggerAlert = async (req, res) => {
    const { userId } = req.body;
    try {
        // Logic for alert (e.g., notify nearby users or play sound)
        return res.status(200).json({ message: 'Alert triggered successfully!' });
    } catch (error) {
        console.error('[Alert Error]', error);
        return res.status(500).json({ message: 'Error triggering alert.' });
    }
};
