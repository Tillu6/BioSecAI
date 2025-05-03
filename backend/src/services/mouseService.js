exports.handleMouse = (req, res) => {
    const { userId, moves } = req.body; // moves: [{x,y,timestamp}]
    console.log('Mouse moves', moves.length);
    res.status(200).json({ success: true });
  };