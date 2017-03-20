app.service("homeService", function($q){

   var service = {};
   service.getData = getData;

   return service;

   function getData(){
      var deferred = $q.defer();

      // generate random data (8 entries)
      var cards = [];
      for(var i = 1; i <= 8; i++){
         cards.push({
            id: i,
            imageUrl: 'https://lorempixel.com/200/200/?' + i
         });
      };

      deferred.resolve(cards);
      return deferred.promise;
   }

});
