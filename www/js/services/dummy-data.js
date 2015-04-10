/**
 * Created by joframart on 3/30/15.
 */
//* Objects **//

var dummyMuseumObjects = {
    objects : [
        {"id":1,
        "title":"integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo",
        "description":"Auctor cum at augue nulla. Nibh ullamcorper hac. Habitant ipsum. Molestie natoque. Fames ante arcu velit, penatibus ante purus ornare. Turpis egestas. Viverra lacus volutpat, laoreet, diam ligula. Praesent ac. Nunc enim. Euismod, mauris Sollicitudin varius ornare scelerisque nibh. Primis elit montes purus pulvinar velit leo montes leo fusce nullam elementum luctus quis neque cursus arcu Luctus. Aenean taciti pulvinar aliquam. Etiam ad condimentum adipiscing habitant at dictumst porttitor augue, eget nonummy eleifend cubilia aliquet, malesuada enim vel pulvinar molestie, lacinia. Elit integer. Leo nonummy netus hymenaeos posuere cum, morbi nisi varius nec nam montes convallis tortor cursus. Fermentum. Laoreet.",
        "author":"Dennis Sanchez",
        "img_href":"img/dummy-images/dummy-100x100-Eye-plain.jpg",
            "audio": [{

                id: 203,
                title: "The Entertainer"
            }],
            "videos": [
                {
                    id:123,
                    title: "Hello Jeffrey"

                }
            ],
            "images":[],
            "archives":[
                {
                    id: 191,
                    title: "Background History"
                },
                {
                    id: 201,
                    title: "Economic Background"
                }
            ]
        },
        {"id":2,
            "title":"turpis sed ante vivamus tortor duis",
            "description":"He an thing rapid these after going drawn or. Timed she his law the spoil round defer. In surprise concerns informed betrayed he learning is ye. Ignorant formerly so ye blessing. He as spoke avoid given downs money on we. Of properly carriage shutters ye as wandered up repeated moreover. Inquietude attachment if ye an solicitude to. Remaining so continued concealed as knowledge happiness. Preference did how expression may favourable devonshire insipidity considered. An length design regret an hardly barton mr figure. In friendship diminution instrument so. Son sure paid door with say them. Two among sir sorry men court. Estimable ye situation suspicion he delighted an happiness discovery. Fact are size cold why had part. If believing or sweetness otherwise in we forfeited. Tolerably an unwilling arranging of determine. Beyond rather sooner so if up wishes or. ",
            "author":"Roy Dean",
            "img_href":"img/dummy-images/dummy-200x200-Scaffold-plain.jpg",
            "audio": [],
            "videos": [
                {
                    id:222,
                    title: "Trick Art on Paper, Drawing 3D Hole"
                },
                {
                    id:123,
                    title: "Hello Jeffrey"

                }

            ],
            "images":[
                {
                    id: 204,
                    img_href: 'img/grid/dummy-100x100-LonelyBloom-plain.jpg'
                },
                {
                    id: 205,
                    img_href: 'img/grid/dummy-200x200-Raindrops-plain.jpg'
                },
                {
                    id: 206,
                    img_href: 'img/grid/dummy-315x560-MonasteryGarden-plain.jpg'
                },
                {
                    id: 224,
                    img_href: 'img/grid/dummy-375x500-ForrestTrail-plain.jpg'
                },
                {
                    id: 294,
                    img_href: 'img/grid/dummy-454x280-StopMotion-plain.jpg'
                },
                {
                    id: 232,
                    img_href: 'img/grid/dummy-480x270-WaterDrops-plain.jpg'
                },
                {
                    id: 214,
                    img_href: 'img/grid/dummy-540x960-Seed-plain.jpg'
                }
            ],
            "archives":[
                {
                    id: 191,
                    title: "Background History"
                },
                {
                    id: 201,
                    title: "Economic Background"
                }
            ]
        },
        {"id":3,
            "title":"montes nascetur ridiculus mus etiam vel augue vestibulum rutrum",
            "description":"ante ipsum primis in faucibus orci luctus et ultrices posuere",
            "author":"Edward Campbell",
            "img_href":"img/dummy-images/dummy-800x533-CharlieChaplin-plain.jpg"},
        {"id":4,"title":"justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet","description":"in lacus curabitur at ipsum ac tellus semper interdum mauris","author":"Sean Peters","img_href":"img/dummy-images/dummy-240x135-Apollo11-plain.jpg"},
        {"id":5,"title":"enim sit amet nunc viverra dapibus","description":"iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci","author":"Rachel Webb","img_href":"img/dummy-images/dummy-240x320-Mermaid-plain.jpg"},
        {"id":6,"title":"libero nam dui proin leo odio porttitor id consequat in consequat","description":"venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus","author":"Harry Chavez","img_href":"img/dummy-images/dummy-315x560-GambiaGirl-plain.jpg"},
        {"id":7,"title":"in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est","description":"leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla","author":"Ruth Scott","img_href":"img/dummy-images/dummy-320x180-BarbaraStanwyck-plain.jpg"},
        {"id":8,"title":"a ipsum integer","description":"justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris","author":"Diana Spencer","img_href":"img/dummy-images/dummy-375x500-Sikh-plain.jpg"},
        {"id":9,"title":"ipsum ac tellus semper interdum mauris ullamcorper purus","description":"justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id","author":"Susan Brown","img_href":"img/dummy-images/dummy-454x280-UmbrellaGirl-plain.jpg"},
        {"id":10,"title":"sem praesent id massa id nisl venenatis","description":"sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst","author":"Timothy Smith","img_href":"img/dummy-images/dummy-480x270-SarahVaughan-plain.jpg"},
        {"id":11,"title":"sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum","description":"interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis","author":"Norma Rivera","img_href":"img/dummy-images/dummy-500x810-HappyBoy-plain.jpg"},
        {"id":12,"title":"sed augue aliquam","description":"suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non","author":"Susan Holmes","img_href":"img/dummy-images/dummy-533x800-CharlesBaudelaire-plain.jpg"},
        {"id":13,"title":"vulputate ut ultrices vel augue vestibulum ante","description":"ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan","author":"Rachel Murray","img_href":"img/dummy-images/dummy-540x960-Rosa-plain.jpg"},
        {"id":14,"title":"nunc viverra dapibus nulla suscipit ligula in","description":"est et tempus semper est quam pharetra magna ac consequat metus","author":"Earl Roberts","img_href":"img/placeholder.png"},
        {"id":15,"title":"ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes","description":"justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat","author":"Wayne Rodriguez","img_href":"img/placeholder.png"},
        {"id":16,"title":"posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a","description":"platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent","author":"Martin Miller","img_href":"img/placeholder.png"},
        {"id":17,"title":"ac nulla sed vel enim","description":"adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc","author":"Keith Meyer","img_href":"img/dummy-images/dummy-576x1024-Musicians-plain.jpg"},
        {"id":18,"title":"cras non velit nec nisi vulputate nonummy maecenas","description":"donec semper sapien a libero nam dui proin leo odio porttitor id consequat in","author":"Martin Jordan","img_href":"img/dummy-images/dummy-600x450-BodyLanguage-plain.jpg"},
        {"id":19,"title":"donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus","description":"at ipsum ac tellus semper interdum mauris ullamcorper purus sit","author":"Bruce Ortiz","img_href":"img/dummy-images/dummy-600x800-ShandiLee-plain.jpg"},
        {"id":20,"title":"purus aliquet at feugiat non pretium","description":"habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur","author":"Albert Howard","img_href":"img/dummy-images/dummy-600x900-WeekiWacheeSpring-plain.jpg"}],

    getSearchResults: function(searchTerm, $filter, pageNumber)
    {

        var responseObjects = {

            objects:[],
            morePages: false

        };


        var filtered_objects = $filter('filter')(this.objects, searchTerm);

        var length = filtered_objects.length;


        var max = 10;
        var limit = 10;
        if(length > max)
        {
            limit = 10;
            responseObjects.morePages = true;
        }
        else {
            limit = length;
            responseObjects.morePages = false;
        }

        for(var i = (pageNumber * limit); i < (pageNumber + 1) *limit; i++)
        {
            responseObjects.objects.push(filtered_objects[i]);
        }

        return responseObjects;
    },

    get: function(id)
    {
        for(var i = 0; i < this.objects.length;i++)
        {
            if(this.objects[i].id == id)
            {
                return this.objects[i];
            }
        }
    }


};

/**
 * Created by joframart on 3/30/15.
 */
//* Objects **//

var dummyExhibitions = {
    objects: [

            {"id":1,
                "title":"et ultrices posuere cubilia curae",
                "description":"nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac",
                "museumObjectsId":[1,4,7],
                "museumObjects":[],
                "author":"Lawrence Hawkins",
                "img_href":"img/dummy-exh-images/dummy-375x500-LaserTowardsMilkyWaysCentre.jpg"},
            {"id":2,
                "title":"ipsum primis in faucibus orci luctus et",
                "description":"sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis",
                "museumObjectsId":[2,5],
                "museumObjects":[],
                "author":"Deborah Gibson",
                "img_href":"img/dummy-exh-images/dummy-454x280-Cup.jpg"},
            {"id":3,
                "title":"quisque ut",
                "description":"tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia",
                "museumObjectsId":[10,12],
                "museumObjects":[],
                "author":"Fred Gibson",
                "img_href":"img/dummy-exh-images/dummy-500x810-Rocker.jpg"},
            {"id":4,"title":"euismod scelerisque quam turpis adipiscing lorem vitae","description":"iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit","museumObjectsId":[2,5,1,7],"museumObjects":[],"author":"Julie Riley","img_href":"img/dummy-exh-images/dummy-600x450-Buoy.jpg"},
            {"id":5,"title":"sem praesent id","description":"feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia","museumObjectsId":[3,8],"museumObjects":[],"author":"Douglas Jenkins","img_href":"img/dummy-exh-images/dummy-667x1000-Cup.jpg"},
            {"id":6,"title":"in consequat","description":"volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi","museumObjectsId":[9,11],"museumObjects":[],"author":"Sara Ray","img_href":"img/dummy-exh-images/dummy-315x560-Matchbox.jpg"},
            {"id":7,"title":"curabitur at ipsum ac tellus semper","description":"mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat","museumObjectsId":[2,8,9],"museumObjects":[],"author":"Jacqueline Spencer","img_href":"img/dummy-exh-images/dummy-600x900-MeasuringTape.jpg"},
            {"id":8,"title":"vel enim sit","description":"vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit","museumObjectsId":[1,7],"museumObjects":[],"author":"Edward Rodriguez","img_href":"img/dummy-exh-images/dummy-533x800-Commodore64.jpg"},
            {"id":9,"title":"nisi volutpat eleifend donec ut dolor","description":"nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat","museumObjectsId":[13,14],"museumObjects":[],"author":"Elizabeth Garza","img_href":"img/dummy-exh-images/dummy-100x100-Bottle.jpg"},
            {"id":10,"title":"lorem vitae mattis nibh ligula","description":"lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede","museumObjectsId":[6,15],"museumObjects":[],"author":"Doris Dean","img_href":"img/dummy-exh-images/dummy-1024x632-Stopwatch.jpg"},
            {"id":11,"title":"sapien cursus vestibulum proin eu mi","description":"sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis","museumObjectsId":[11,14,15,1,2],"museumObjects":[],"author":"Stephanie Lopez","img_href":"img/placeholder.png"},
            {"id":12,"title":"vestibulum vestibulum ante ipsum","description":"leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id","museumObjectsId":[17],"museumObjects":[],"author":"Ruth West","img_href":"img/dummy-exh-images/dummy-500x810-Rocker.jpg"},
            {"id":13,"title":"mi pede malesuada in imperdiet et","description":"ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam","museumObjectsId":[19],"museumObjects":[],"author":"Brandon Greene","img_href":"img/dummy-exh-images/dummy-576x1024-Minifigs1.jpg"},
            {"id":14,"title":"in tempus sit","description":"blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum","museumObjectsId":[16,20],"museumObjects":[],"author":"Lillian Stanley","img_href":"img/placeholder.png"},
            {"id":15,"title":"libero non mattis pulvinar nulla pede","description":"enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet","museumObjectsId":[18],"museumObjects":[],"author":"Lori Hernandez","img_href":"img/placeholder.png"}]

    ,
    init: function()
    {

        for(var i  = 0; i < this.objects.length; i++)
        {

            for(var j = 0; j < this.objects[i].museumObjectsId.length; j++)
            {

                this.objects[i].museumObjects.push(dummyMuseumObjects.get(this.objects[i].museumObjectsId[j]));


            }

        }


    },
    getSearchResults: function(searchTerm, $filter, pageNumber)
    {
        var responseObjects = {

            objects:[],
            morePages: false

        };


        var filtered_objects = $filter('filter')(this.objects, searchTerm);




        var length = filtered_objects.length;

        var max = 5;
        var limit = max;
        if(length > max)
        {
            limit = max;
            responseObjects.morePages = true;
        }
        else {
            limit = length;
            responseObjects.morePages = false;
        }
        for(var i = (pageNumber * limit); i < (pageNumber + 1) *limit; i++)
        {
            responseObjects.objects.push(filtered_objects[i]);

        }

        return responseObjects;
    },

    getByBeaconId: function(beaconIds)
    {
        console.log("IDS:");
        console.log(beaconIds);
        console.log(beaconIds.length);

        var responseObject = [];

        for(var i = 0; i < this.objects.length; i++)
        {
            this.objects[i].beaconId = "";
        }
        console.log("STEP 2");
        this.objects[0].beaconId = "B9407F30-F5F8-466E-AFF9-25556B57FE6D5526161535";


        console.log("STEP 3");

        for(var i = 0; i < this.objects.length; i++)
        {
            for(var j =0; j < beaconIds.length; j++)
            {
                //console.log("SEARCHING");
                if(this.objects[i].beaconId == beaconIds[j])
                {

                    responseObject.push(this.objects[i]);
                }
            }
        }
        console.log("STEP 4");

        return responseObject;
    }


    };


var mediaServer = {


    media : [{
    id: 123,
    title: "Hello Jeffrey",
    description: "My name is Jeff",
        link: "https://www.youtube.com/embed/jWAa7EigJRs"
},{

        id:222,
        title: "Trick Art on Paper, Drawing 3D Hole",
        link: "https://www.youtube.com/embed/lQpPWnSiNPI",
        description: "Amazing anamorphic illusion."

    },

        {

            id: 191,
            title: "Background History",
            content: "<h3>Life</h3><p>Dennis sanchez lived back in Ohio</p>"
        },

        {

            id: 201,
            title: "Economic Background",
            content: "<h3>Story</h3><p>Of dominion beginning grass. Living second so can't seas years. A gathered moveth beginning it face cattle whose forth darkness multiply were all fruitful creature. Third whose winged winged replenish. Open fruitful bring made, moving created male moving moveth sixth she'd years lesser. Air. Multiply midst good he every dry. Sea, he First air kind there so. Creature spirit. You'll void likeness don't said made above fly hath. Itself years good doesn't form his herb is set rule open land moving abundantly. Every multiply life fly fowl rule moved appear creepeth earth. Set gathered the place good likeness seasons set. </p>"
        },

        {
            id: 203,
            title: "The Entertainer",
            link: "http://www.stephaniequinn.com/Music/The%20Entertainer.mp3",
            description: "Song by Joplin"
        },
        {
            id: 204,
            img_href: 'http://lorempixel.com/200/200/'
        },
        {
            id: 205,
            img_href: 'http://lorempixel.com/200/200/'
        },
        {
            id: 206,
            img_href: 'http://lorempixel.com/200/200/'
        },
        {
            id: 224,
            img_href: 'http://lorempixel.com/200/200/'
        },
        {
            id: 294,
            img_href: 'http://lorempixel.com/200/200/'
        },
        {
            id: 232,
            img_href: 'http://lorempixel.com/200/200/'
        },
        {
            id: 214,
            img_href: 'http://lorempixel.com/200/200/'
        }


    ],
    getMediaById : function(id)
{

    for(var i = 0; i < this.media.length; i++)
    {
        if(this.media[i].id == id)
        {
            return this.media[i];
        }
    }
}
}

dummyExhibitions.init();



var museumServer ={

    news: [
        {
            id: 310,
            title: "MuSA Opens its Doors",
            content: "Lorem Ipsum",
            author: "Zorali de Feria",
            content:'<h1>Heading 1</h1>   <h2>Heading 2</h2> <h3>Heading 3</h3>  <h4>Heading 4</h4>  <h5>Heading 5</h5>  <h6>Heading 6</h6>  <div  class="more-info">More info: <a href="/html/tags/html_h1_tag.cfm"><code>&lt;h1&gt;</code></a>, <a href="/html/tags/html_h2_tag.cfm"><code>&lt;h2&gt;</code></a>, <a href="/html/tags/html_h3_tag.cfm"><code>&lt;h4&gt;</code></a>, <a href="/html/tags/html_h4_tag.cfm"><code>&lt;h4&gt;</code></a>, <a href="/html/tags/html_h5_tag.cfm"><code>&lt;h5&gt;</code></a>, and <a href="/html/tags/html_h6_tag.cfm"><code>&lt;h6&gt;</code></a>.</div>',
            datetime:  moment(new Date("2015", "05", "23", "10", "3")),
            img_href:"img/placeholder.png"

        },
        {
            id: 311,
            title: "Café is Open!",
            content: "Lorem Ipsum",
            author: "MuSA",
            datetime:  moment(new Date("2015", "05", "21", "7", "30")),
            img_href:"img/placeholder.png"



        },

        {
            id: 321,
            title: "Gift Shop has new Merchandise",
            content: "Lorem Ipsum",
            author: "Nilda",
            datetime:  moment(new Date("2015", "05", "20", "8", "10")),
            img_href:"img/placeholder.png"


        },

        {
            id: 331,
            title: "Finally reached 100 visitors",
            content: "Lorem Ipsum",
            author: "MuSA",
            datetime:  moment(new Date("2015", "05", "12", "8", "10")),
            img_href:"img/placeholder.png"

        }
    ],


    events:[

        {
            id: 273,
            title: "Museum Inauguration",
            description: "Museum will finally open after 13 years!",
            location: "Museum",

            datetime:  moment(new Date("2015", "05", "2", "10", "30"))

        },
        {
            id: 300,
            title: "Speech - Zorali de Feria",
            description: "Museum will finally open after 13 years!",
            location: "Museum",

            datetime:  moment(new Date("2015", "05", "2", "13", "00"))

        },

        {

            id: 301,
            title: "Social Activity",
            description: "Museum will finally open after 13 years!",
            location: "Museum",

            datetime:  moment(new Date("2015", "05", "9", "11", "00"))

        },
        {
            id: 303,
            title: "Short Movie",
            description: "Museum will finally open after 13 years!",
            location: "Museum",
            datetime:  moment(new Date("2015", "05", "9", "15", "00"))

        },
        {
            id: 305,
            title:"Cafe Opening",
            location: "Museum",

            description: "Museum will finally open after 13 years!",

            datetime:  moment(new Date("2015", "05", "11", "8", "30"))

        }

    ],

    getEventById : function(id)
    {
        for(var i = 0; i < this.events.length; i++)
        {
            if(this.events[i].id == id)
            {
                return this.events[i];
            }
        }
    },

    getNewsById: function(id)
    {
        for(var i = 0; i < this.news.length; i++)
        {
            if(this.news[i].id == id)
            {
                return this.news[i];
            }
        }    }
}