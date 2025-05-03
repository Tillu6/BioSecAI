exports.handleKeystroke = (req, res) => {
    const { userId, events } = req.body; // events: [{key, timestamp, type}]
    // TODO: preprocess & store or analyze patterns
    console.log('Keystroke data', events.length);
    res.status(200).json({ success: true });
  };