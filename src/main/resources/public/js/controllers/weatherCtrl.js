app.controller('weatherController', function($scope, $http){

    $scope.location = '';

    $scope.initial = function(){
         $('.loading').hide();
    };

    $scope.getDate = function(input) {
        if(input ===undefined)
            return;
        var parts = input.split(' ');
        return parts[0];
    };

    $scope.refresh = function(){
        $('.loading').show();
        if($scope.location != ''){
            url = "http://api.openweathermap.org/data/2.5/forecast?q=" + $scope.location + "&mode=json&appid=c5075e558efec609f928da0f3ceb005f"
            $http.get(url).
                success(function(data){
                    $scope.weatherData = data;
                    angular.forEach($scope.weatherData.list, function(value1, i) {
                        $scope.weatherData.list[i].date = $scope.getDate(value1.dt_txt);
                    });
                    $('.loading').hide();
        	    }).
                error(function(){
                    $('.loading').hide();
                    $('.error').show().html("Some error occured while fetching weather details from API");
        });

      } else {
        $scope.initial();
      }
    };

    $scope.initial();
});
