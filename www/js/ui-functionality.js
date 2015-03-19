///**
// * Created by joframart on 3/14/15.
// */
//

function addDiv() {
    var eventCards = document.getElementsByClassName('event-card');

    eventCards.forEach(function (eventCard) {

            eventCard.style.cursor = 'pointer';
            eventCard.onclick = function () {
                window.location = "/museum-events/" + eventCard.getAttribute('event-id');
            };

        }
    );

}





