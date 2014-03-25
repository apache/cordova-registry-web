angular.module('registry').filter('platformFilter', function () {
    return function (items, platformFilters) {
        if(platformFilters == null || platformFilters.length == 0) {
            return items;//short circuit, if no filter, return original list.
        }
        console.log(items);
        console.log(platformFilters);
        var newItems = [];

        // "firefoxos"
        // "android"
        // "amazon-fireos"
        // "ubuntu"
        // "ios"
        // "blackberry10"
        // "wp7"
        // "wp8"
        // "windows8"

        for(var i = 0, j = items.length -1; i < j; i++) {

            var item = items[i];
            if(!item.value || !item.value.versions)
                continue;//cant do anything & we dont want in list if it doenst exist, right?

            var latestVersion = item.value.versions[item.value['dist-tags'].latest];

            if(!latestVersion)
                continue; //no latest version, what can you do?

            if(!latestVersion.platforms)
                continue;

            var platformCount = 0;

            for(platform in platformFilters) {
                if(latestVersion.platforms.indexOf(platformFilters[platform]) != -1)
                    platformCount++;
            }
            if(platformCount <= 0)
                continue;
    
            newItems.push(item);
        }

        

        return newItems;
    };
});