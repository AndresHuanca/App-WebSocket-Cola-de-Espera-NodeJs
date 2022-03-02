// Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');



const searchParams =  new URLSearchParams( window.location.search );

if( !searchParams.has('escritorio') ) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}
// escritorio enviado en params
const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

// invisible alert
divAlerta.style.display = 'none';

// Import socket io
const socket = io();




socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;
});

//Cola 
socket.on('tickets-pendientes', ( tickets ) => {
    
    if( lblPendientes === 0 ) {
        lblPendientes.display = 'none';
    }else {
        lblPendientes.display = '';
        lblPendientes.innerText = tickets ;
    }
});

btnAtender.addEventListener( 'click', () => {
    
    
    socket.emit('atender-ticket', { escritorio }, ( { ok, ticket, msg }) => {

        if( !ok ) {
            lblTicket.innerText = 'Nadie.';
            return divAlerta.style.display = '';
        }

        lblTicket.innerText = 'Ticket' + ticket.numero;
        
    });

});


