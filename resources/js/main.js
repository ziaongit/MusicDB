(function musicDB(){
    this.init =function() {
        this.search();
    };

/* --------------------------
        SEARCH START
--------------------------- */
    this.search = function(){
        var form = document.querySelector('#form');
        form.addEventListener('submit', function(e){
            e.preventDefault();
            var searchValue = document.querySelector('#input_search').value;
            
            form.reset();
            getData(searchValue.split(' ').join('+'));

        });
    };

/* --------------------------
        SEARCH END
--------------------------- */

/* --------------------------
        GET DATA START
--------------------------- */
    this.getData = function(artist) {

        var http = new XMLHttpRequest();
        var url = 'https://itunes.apple.com/search?term='+artist+'&entity=album';
        var method = 'GET';
        var container = document.querySelector('#album_list_container');

        container.innerHTML = '';
        http.open(method, url);

        http.onreadystatechange = function(){
            if(http.readyState === XMLHttpRequest.DONE && http.status === 200) {

                var jsonResponse = JSON.parse(http.response);
                console.log(jsonResponse);

                showArtist(jsonResponse);

            }else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200) {
                console.log('something is wrong')
            }
        }

        http.send();
    };
/* --------------------------
        GET DATA END
--------------------------- */

/* --------------------------
    SHOW ARTIST START
--------------------------- */
    this.showArtist = function(object) {
        var container = document.querySelector('#album_list_container');
        var template = '';

        if(object.results.length > 0) {

            document.querySelector('#no_data').style.display = 'none';

            for(var i = 0; i < object.results.length; i++) {
                template += '<div class="col-sm-3 album_item">';
                template +=     '<div class="item_thumbnail" style="background:url()"></div>';
                template +=     '<div class="item_title">Love is easy</div>';
                template +=     '<div class="item_price">';
                template +=         '<span>Proce:</span> 200 USD';
                template +=     '</div>';
                template +=     '<a href="#" target="_blank">Buy Now</a>';
                template += '</div>';
            }
            
            container.innerHTML = '';
            container.insertAdjacentHTML('afterbegin', template);

        }else {
            document.querySelector('#no_data').style.display = 'block';
        }
    };

/* --------------------------
    SHOW ARTIST END
--------------------------- */




    this.init();
})();