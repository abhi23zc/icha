var socket = io()

let container = document.getElementById('container')
let msg = document.getElementById('msg')
let chat_area = document.getElementsByClassName('chat_area')
let chat_area_id = document.getElementById('chat_area')
let chattext = document.getElementById('chattext')
let username ="Abhishek"
let send = document.getElementById('send')

send.addEventListener('click',(e) =>{

    
    send_msg(msg.value, 'outgoing')
    msg.value = ''
    

})

msg.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){

        send_msg(e.target.value, 'outgoing')
        msg.value = ''
    }
    
})

function send_msg(msg, type){
    msg.value = ""
    let msg_obj = {
        type:type,
        name:username,
        message: msg
    }

    socket.emit('message', msg_obj);
    append_msg_out(msg_obj, 'incoming')


}


function append_msg_in(msg, type) {
  
    let main_div = document.createElement('div')
    let markup = `
    <p class="incoming md:ml-[18rem] font-semibold w-1/2 p-2 border-black text-white justify-end bg-blue-400 rounded-md">${msg.message}</p>
    `
    main_div.innerHTML = markup

    chat_area[0].appendChild(main_div)

    pageScroll()

}
function append_msg_out(msg, type) {
  
    let main_div = document.createElement('div')
    let markup = `
    <p class="outgoing md:ml-0 ml-28 font-semibold w-1/2 p-2 border-black text-black justify-end bg-gray-200 rounded-md">${msg.message}</p>
    `
    main_div.innerHTML = markup

    chat_area[0].appendChild(main_div)
    
    pageScroll()

}



socket.on('message', function(msg) {
    console.log(msg.name)
    chattext.innerText = msg.name
    append_msg_in(msg, "incoming")

    pageScroll()

    
  });

  function pageScroll(){
      chat_area_id.scrollTo(0, chat_area_id.scrollHeight)
    // window.scrollTo(500,500)
  }