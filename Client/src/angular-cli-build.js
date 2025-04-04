module.exports = function(defaults) {
    return new Angular2App(defaults, { 
     vendorNpmFiles: [
       ...
       'videogular2/dist/**/*',
       'videogular2/core.+(ts|js)',
       'videogular2/controls.+(ts|js)',
       'videogular2/overlay-play.+(ts|js)'
     
     ]
    });
  };