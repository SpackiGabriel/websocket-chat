$(() => {
    const socket = io()
    socket.nickname = ''

    $('form').submit((evt) => { 
        if(socket.nickname === '') {
            socket.nickname = $('#msg_input').val()
            socket.emit('login_msg', socket.nickname)

            $('#msg_input').keypress(() => {
                socket.emit('chat_status', `${socket.nickname} is typing...`)
            })

            $('#msg_input').keyup(() => {
                socket.emit('chat_status', '')
            })


            socket.on('chat_status', (msg) => {
                $('#status').html(msg)
            })
        }
        else {
            socket.emit('chat_msg', $('#msg_input').val())
        }

        $('#msg_input').val('')
        return false
    })

    socket.on('chat_msg', (msg) => {
        $('#msg_list').append($('<li>').text(msg))
    })
})