
$(window).resize(function () {
    if (document.body.clientWidth > 550) {
        window.location = 'html/desktop.html';
    }
});
function htmlEscape(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/ /g, '%20')
        .replace(/>/g, '&gt;');
}
function clearText(str) {
    return str
        .replace(/:/g, '')
        .replace(/"/g, '')
        .replace(/'/g, '')
        .replace(/,/g, '')
        .replace(/ /g, '')
        .replace(/\./g, '')
        .replace(/\s+/g, '')
        .replace(/-/g, '');
}

function has(obj, value) {
    for (var id in obj) {
        if (obj[id] == value) {
            return true;
        }
    }
    return false;
}

// Jquery
//function filterDiscoverReveal() {
//    $('#movie_details').removeClass('movieDetailsReveal');
//}