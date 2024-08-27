/*
Sample code for vulnerability code : Clear Text Sensitive Storage
CWE : CWE-312/200
Discription : Storing sensitive values in putObject can allow an attacker to access potentially sensitive information
*/


angular.module("app")
    .controller("controller", function($cacheFactory, $templateCache, $cookies) {
        // NOT OK - Storing passwords directly in cache or template cache is not recommended
        $cacheFactory.put("x", data1.password);
        $templateCache.put("x", data2.password);

        // NOT OK - Storing passwords directly in cookies is not secure
        $cookies.put("x", data3.password);
        $cookies.putObject("x", data4.password); //Source and Sink

        // OK - Storing passwords in other variables is acceptable
        $cookies.other("x", data5.password);
        other.put("x", data6.password);
        
        // OK - Storing passwords as keys (not values) in cookies is acceptable
        $cookies.put(data7.password, "x");
    });
