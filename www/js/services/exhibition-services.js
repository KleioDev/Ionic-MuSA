angular.module('exhibition-services', [])

.factory('ExhibitionSegmentedControlState', function()

    {
        var segmentedControlState = {
            "nearMeState": false,
            "objectsState":true,
            "exhibitionsState":false
        };

        return {
            get :function(){

                return segmentedControlState;
            },

            set: function(state){

                /* SHOULD BE A BETTER WAY OF DOING THIS */
                if(state == "nearMeState")
                {
                    segmentedControlState.nearMeState = true;
                    segmentedControlState.objectsState = false;
                    segmentedControlState.exhibitionsState = false;

                }
                if(state == "objectsState")
                {
                    segmentedControlState.nearMeState = false;
                    segmentedControlState.objectsState = true;
                    segmentedControlState.exhibitionsState = false;

                }
                if(state == "exhibitionsState")
                {
                    segmentedControlState.nearMeState = false;
                    segmentedControlState.objectsState = false;
                    segmentedControlState.exhibitionsState = true;

                }

            }

        };




    })

.factory('MuseumExhibitions', function()
    {



    })


.factory('MuseumObjects', function()
{

    var museumObjects =
    [
        {"id": 301,
        "author": "Joseph Franco",
            "title": "The Beauty In Red",
        },
        {"id": 303,
            "author": "Joan Prandero",
            "title": "La Rosa",
            description: "Denote simple fat denied add worthy little use. As some he so high down am week. Conduct esteems by cottage to pasture we winding. On assistance he cultivated considered frequently. Person how having tended direct own day man. Saw sufficient indulgence one own you inquietude sympathize."
            +"Up unpacked friendly ecstatic so possible humoured do. Ample end might folly quiet one set spoke her. We no am former valley assure. Four need spot ye said we find mile. Are commanded him convinced dashwoods did estimable forfeited. Shy celebrated met sentiments she reasonably but. Proposal its disposed eat advanced marriage sociable. Drawings led greatest add subjects endeavor gay remember. Principles one yet assistance you met impossible."
            ,
            mainAudioAvailable: true
        },

        {"id": 305,
            "author": "Agustin Stahl",
            "title": "Magnolia",
        },

        {"id": 306,
            "author": "Brian Martinez",
            "title": "La vida y la muerte",
        }

    ];

    return {
        all: function()
        {
            return museumObjects;
        },

        get: function(objectId)
        {
            for (var i = 0; i < museumObjects.length; i++) {
                if (museumObjects[i].id === parseInt(objectId)) {
                    return museumObjects[i];
                }
            }
        }
    }
})


.factory('MuseumExhibitionsNearMe', function(){



    });
