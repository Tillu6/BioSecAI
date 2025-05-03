exports.handleGesture = (req, res) => {
    const { userId, path } = req.body; // path: [{x,y,timestamp}]
    console.log('Gesture path points', path.length);
    res.status(200).json({ success: true });
  };