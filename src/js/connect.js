let socket = io.connect('http://localhost:4000');

// listen for event
socket.on('kifu_data', (obj) => {
    // this event happen when client click 'play'
    // and server sent back prepared data structure `obj`


});