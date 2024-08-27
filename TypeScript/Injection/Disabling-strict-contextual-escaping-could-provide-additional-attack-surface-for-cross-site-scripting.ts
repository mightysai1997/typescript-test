/*
Sample code vulnerability code : Disabling Strict Contextual escaping (SCE) could provide additional attack surface for Cross-site Scripting (XSS)
CWE : 79
Discription : The provided code sets $sceProvider to false by enabling it. Disabling Strict Contextual Escaping (SCE) could potentially widen the attack surface for Cross-site Scripting (XSS) vulnerabilities.
*/


import angular from 'angular';

angular.module('app', [])
    .config(['$sceProvider', ($sceProvider: angular.ISCEServiceProvider) => {
        $sceProvider.enabled(false); //Source and Sink
    }])
    .controller('controller', ['$scope', ($scope: angular.IScope) => {
        // ...
        const item: any = getItem(); // Assuming getItem() is a function to retrieve data
        $scope.html = `<ul><li>${item.toString()}</li></ul>`;
    }]);

function getItem(): any {
    // Logic to retrieve item
    return 'Example Item';
}
