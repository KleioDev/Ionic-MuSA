angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope) {})

    .controller('ChatsCtrl', function($scope, Chats) {
        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        }
    })

    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })


//=================== Museum Tab Controllers ====================//


    .controller('MuseumSegmentedControl', function( $scope, AppNavigationTitles, MuseumSegmentedControlService)
    {
        var museumTabState = MuseumSegmentedControlService;
        $scope.navigationTitles = AppNavigationTitles.museum;
        $scope.museumTabState = museumTabState.get();


        /* Change segmented control state to general */
        $scope.museumGeneralView = function()
        {
            museumTabState.set("general");
            $scope.museumTabState = museumTabState.get();
        };

        /* Change segmented control state to Events */
        $scope.museumEventsView = function()
        {
            museumTabState.set("events");
            $scope.museumTabState = museumTabState.get();
        };

        /* Change segmented control state to News */
        $scope.museumNewsView = function()
        {
            museumTabState.set("news");
            $scope.museumTabState = museumTabState.get();
        }


    })

    .controller('MuseumGeneralCtrl', function($scope, AppNavigationTitles, MuseumGeneralAccordionState)
    {

        var accordionState = MuseumGeneralAccordionState;
        $scope.generalState = $scope.$parent.generalState;
        $scope.navigationTitles = AppNavigationTitles.museum;

        $scope.accordionState = accordionState;
        $scope.museumAccordionState = MuseumGeneralAccordionState.get();

        $scope.toggle = function(tag)
        {

                $scope.accordionState.toggle(tag);

        };
        $scope.openBottomSheet = function() {
            $mdBottomSheet.show({
                template: '<md-bottom-sheet>Hello!</md-bottom-sheet>'
            })}



    })

    .controller('MuseumEventsCtrl', function( $scope, $state, AppNavigationTitles, Events)
    {
        $scope.navigationTitles = AppNavigationTitles.museum;
        $scope.eventsToday = Events.getEventsToday();
        $scope.upcomingEvents = Events.getUpcomingEvents();


        $scope.openEvent = function(eventId)
        {
            $state.go('tab.museum-events-single', {eventId: eventId});
        }

    })

    .controller('MuseumNewsCtrl', function($scope, AppNavigationTitles, News)
    {
        $scope.navigationTitles = AppNavigationTitles.museum;
        $scope.currentNews = News.currentNews();
        $scope.pastWeekNews = News.pastWeekNews();

    })

    .controller('MuseumSingleEventCtrl', function($scope, $stateParams, AppNavigationTitles, Events, $ionicPopup)
    {
        $scope.navigationTitles = AppNavigationTitles.museum.eventsSingle;
        $scope.event = Events.get($stateParams.eventId);

        /* Handle pop up */
        $scope.addToCalendar = function(event) {

            console.log(event);
            var confirmPopup = $ionicPopup.confirm({

                title: 'Add Event To Calendar?',
                template: '<strong>'+event.title+'</strong>'
                        + '<p>'+event.datetime.format('lll')+'</p>'

            });

            confirmPopup.then(function(res)
            {
                if(res)
                {   //Add event to calendar!
                    console.log('Yes');
                }
                else{

                    //NO
                    console.log('No');
                }

            });

        }

    })

    .controller('MuseumSingleNewsCtrl', function($scope, $stateParams, AppNavigationTitles,News)
    {
        $scope.navigationTitles = AppNavigationTitles.museum.newsSingle;
        console.log($stateParams.newsId);
        $scope.news = News.get($stateParams.newsId);

    })

//=================== Exhibition Tab Controllers ====================//

.controller('ExhibitionSegmentedCtrl', function($scope, AppNavigationTitles, ExhibitionSegmentedControlState)
{
    var segmentedControlState = ExhibitionSegmentedControlState;

    $scope.navigationTitles = AppNavigationTitles.collection;

    $scope.segmentedControl = segmentedControlState.get();

    /* Change segmented control state to Near Me */
    $scope.nearMeView = function()
    {
        segmentedControlState.set("nearMeState");
        $scope.museumTabState = segmentedControlState.get();
    };

    /* Change segmented control state to Objects */
    $scope.objectsView = function()
    {
        segmentedControlState.set("objectsState");
        $scope.museumTabState = segmentedControlState.get();
    };

    /* Change segmented control state to Exhibitions */
    $scope.exhibitionsView = function()
    {
        segmentedControlState.set("exhibitionsState");
        $scope.museumTabState = segmentedControlState.get();
    }

})

.controller('CollectionObjectListCtrl', function($scope, AppNavigationTitles, MuseumObjects){

    $scope.museumObjects = MuseumObjects.all();
    })

.controller('ObjectViewCtrl', function($scope, MuseumObjects, $stateParams, $ionicModal)
{

    $ionicModal.fromTemplateUrl('image-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function() {
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });
    $scope.$on('modal.shown', function() {
        console.log('Modal is shown!');
    });

    console.log($stateParams.objectId);
    $scope.museumObject = MuseumObjects.get($stateParams.objectId);
    $scope.showImage = function(index) {
        $scope.imageSrc  = 'http://ionicframework.com/img/homepage/phones-weather-demo@2x.png';
        $scope.openModal()


    }

});
