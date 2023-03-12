function initializeChat() {
    const socket = io();
    socket.on('new message', function(chat) {
      var row = '<tr>' +
        '<th><h2>' + chat.email + '</h2></th>' +
        '<th><p>' + chat.message + '</p></th>' +
        '<th><p>' + chat.date + '</p></th>' +
        '</tr>';
      $('table tbody').append(row);
    });
    $('form').submit(function(event) {
      event.preventDefault();
      var email = $('#sender-email').val();
      var message = $('#message-body').val();
      socket.emit('new message', { email: email, message: message });
      $('#message-body').val('');
    });
  }

module.exports = initializeChat();