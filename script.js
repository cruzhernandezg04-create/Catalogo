const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
/* Filtros + conteo */
const cards = [...$$('.card')];
$$('.tab').forEach(b => {
    const f = b.dataset.f;
    b.querySelector('small').textContent = f === 'todos' ? cards.length : cards.filter(c => c.dataset.c === f).length;
    b.addEventListener('click', () => {
        $$('.tab').forEach(x => x.setAttribute('aria-pressed', x === b));
        cards.forEach(c => c.hidden = !(f === 'todos' || c.dataset.c === f));
    });
});
/* Formulario → WhatsApp */
function armar() {
    const f = $('#fecha').value.split('-').reverse().join('/');
    const it = [...$$('.chips input:checked')].map(i => i.value).join(', ');
    const msg = ['Hola, quisiera cotizar una renta.', '',
        'Tipo de evento: ' + ($('#tipo').value || 'por definir'),
        'Fecha: ' + (f || 'por definir'),
        'Invitados: ' + ($('#inv').value || 'por definir'),
        'Zona de entrega: ' + ($('#zona').value || 'por definir'),
        'Me interesa: ' + (it || 'por definir')].join('\n');
    $('#send').href = 'https://wa.me/525651860923?text=' + encodeURIComponent(msg);
}
$$('.form input,.form select').forEach(e => e.addEventListener('input', armar));
armar();