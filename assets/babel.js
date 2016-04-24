'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// (function(){
//   "use strict";

//   class

//   //try es6 class and use babel npm to convert

// })();

var Expand = function () {
  function Expand(divId, optionsObj) {
    _classCallCheck(this, Expand);

    options = options || {};
    options.height = options.hasOwnProperty('height') ? options.height : 300;
    options.fade = options.hasOwnProperty('fade') ? options.fade : false;

    this.div = this.setDiv(divId);
    this.height = options.height;
  }

  _createClass(Expand, [{
    key: 'setDiv',
    value: function setDiv(id) {
      try {
        document.getElementById(id);
      } catch (err) {
        throw "Cannot find div with id: " + id;
      }
      return document.getElementById(id);
    }
  }]);

  return Expand;
}();

var testExpand = new Expand("expand-div-1");
console.log(testExpand);

/*

seeMore: {

    //expanded: [],
    //buttonsVisible: [],
    //buttonParents: [],
    //
    buttonDetails: {},

    setUp: function () {
      buttonArr = $( '.interaction--see-more--button' ).toArray();
      holderArr = $( '.interaction--see-more--holder').toArray();
      bottomShadowArr = $( '.interaction_bottom-shadow').toArray();

      this.buttonArray = buttonArr;
      this.holderArray = holderArr;
      this.bottomShadowArray = bottomShadowArr;

      for ( var a = 0; a < buttonArr.length; a++ ){
        var idString = buttonArr[a].id.toString();

        if ( typeof window.addEventListener === 'function' ){
          (function (_a) {
              _a.addEventListener('click', function(){
                  //console.log(_a);
                  dpsInteractions.seeMore.touchSeeMoreExpand( _a );
              });
          })(buttonArr[a]);
        }

        this.buttonDetails[ idString ] = {
          button: buttonArr[a],
        }

        if ( $( buttonArr[a] ).hasClass( "interaction--see-more--button--default-hidden" ) ) {
          this.buttonDetails[ idString ].visible = false;
        } else {
          this.buttonDetails[ idString ].visible = true;
        }

        this.buttonDetails[ idString ].expanded = false;

        for ( var i = 0; i < holderArr.length; i++ ) {
          var holderIdString = holderArr[i].id.toString();
          if ( this.buttonDetails.hasOwnProperty( holderIdString ) ) {
            this.buttonDetails[ holderIdString ].holder = holderArr[i];
            this.buttonDetails[ holderIdString ].holderHeight = $( holderArr[i] ).height();
          }
        }

        //this.buttons[ buttonArr[a].id ] = buttonArr[a];
        //this.buttonParents[ buttonArray[a].id ] = array[a].parentNode;
      }

      //console.log(this.buttonArray);
      //console.log(this.buttonDetails);

    },

    showOrHideSeeMoreButton: function( element, action ) {
      //console.log(element);
      //console.log(action)

      var seeMore = this
        , arr = seeMore.buttonArray;

      for ( i = 0; i < arr.length; i++ ) {
        if ( arr[i].id == element ) {
          if ( action == "in" ) {

            if( dpsInteractions.blink.hasBlink( arr[i] ) ) {
              dpsInteractions.blink.turnBlinkOn( arr[i] );
            }

            $( arr[i] ).stop().fadeTo( 100, 1 );
          } else if ( action == "out" ) {

            if( dpsInteractions.blink.hasBlink( arr[i] ) ) {
              dpsInteractions.blink.turnBlinkOff( arr[i] );
            }


            //$( arr[i] ).css( "opacity", 0 );
            $( arr[i] ).stop().fadeTo( 100, 0 );
            //console.log( "jamalangadingdong");
            //console.log( arr[i] );
          }
        }
      }
    },

    touchSeeMoreExpand: function( button, scroll ) {
      var seeMore = this
        , buttonId = button.id
        , buttonIdString = buttonId.toString()
        , detailsObject
        , selectedHolder
        , buttonArrPos
        , buttonClone;

      if ( !scroll && $(button).hasClass("interaction_accordion") ) {
        scroll = true;
      } else {
        scroll = false;
      }

      detailsObject = seeMore.buttonDetails[ buttonIdString ];
      selectedHolder = detailsObject.holder;

      if ( scroll ) {
        $( selectedHolder ).animate({
          height: $( selectedHolder ).get(0).scrollHeight
        }, 0, function(){
          var scrollTopTotal = document.body.clientHeight - dpsInteractions.deviceHeight;
          $( window ).scrollTo( scrollTopTotal, 500);
        });
      } else {
        $( selectedHolder ).animate({
          height: $( selectedHolder ).get(0).scrollHeight
        }, 500);
      }




      buttonArrPos = seeMore.buttonArray.indexOf(button);
      buttonClone = button.cloneNode(true);

      button.parentNode.replaceChild(buttonClone, button);

      //call to Adobe HTML Gesture API to disable touch on cloned button
      api.disableNavDropdown(buttonClone);

      seeMore.buttonArray[buttonArrPos] = buttonClone;

      if( /Read/.test(buttonClone.innerHTML) ) {
        //console.log(buttonClone.innerHTML);
        buttonClone.innerHTML = "<p>- Read Less</p>";
      }


      if ( $ ( buttonClone ).find( "span" ).length > 0) {
        var theSpan = $ ( buttonClone ).find( "span" )[0];
        theSpan.innerHTML = "&ndash;";
      }


      buttonClone.addEventListener('click', function() {
        (function (_b) {
          seeMore.touchSeeMoreContract( _b, true );
        })(buttonClone);
      });

      dpsInteractions.blink.replaceBlinkReference( button, buttonClone );

      for ( var i = 0; i < seeMore.bottomShadowArray.length; i++ ) {
        var bottomShadow = seeMore.bottomShadowArray;
        if ( bottomShadow[i].id === buttonId ) {
          $( bottomShadow[i] ).fadeOut();
          break;
        }
      }

      seeMore.buttonDetails[buttonIdString].expanded = true;
    },

    findButton: function( touchedId ) {
      var seeMore = this
        , arr = seeMore.buttonArray
        , button;

      for ( i = 0; i < arr.length; i++ ) {
        if ( arr[i].id == touchedId ) {
            button = arr[i];
            //console.log(button);
        }
      }
      return button;
    },

    touchSeeMoreContract: function( button, scroll ) {
      var seeMore = this
        , buttonId = button.id
        , buttonIdString = buttonId.toString()
        , detailsObject
        , selectedHolder
        , height
        , buttonArrPos
        , buttonClone;

      if ( !scroll || $(button).hasClass("interaction_accordion") ) {
        scroll = false;
      }

      detailsObject = seeMore.buttonDetails[ buttonIdString ];
      selectedHolder = detailsObject.holder;
      height = detailsObject.holderHeight;

      //$( selectedHolder ).animate({
      //  height: height
      //}, 500, //function() {
        console.log("holder is finished animating");
        if ( scroll ) {
          var offsetHeight = 200;
          $( window ).scrollTo( $( selectedHolder).offset().top - offsetHeight, 350, function() {
            $( selectedHolder ).animate({
              height: height
            }, 200);
          });
        } else {
          $( selectedHolder ).animate({
            height: height
          }, 500);
        }
      //});

      buttonArrPos = seeMore.buttonArray.indexOf(button);
      buttonClone = button.cloneNode(true);

      button.parentNode.replaceChild(buttonClone, button);

      //call to Adobe HTML Gesture API to disable touch on cloned button
      api.disableNavDropdown(buttonClone);

      seeMore.buttonArray[buttonArrPos] = buttonClone;

      if ( /Read/.test(buttonClone.innerHTML) ) {
        //console.log(buttonClone.innerHTML);
        buttonClone.innerHTML = "<p>+ Read More</p>";
      }


      if ( $ ( buttonClone ).find( "span" ).length > 0 ) {
        var theSpan = $ ( buttonClone ).find( "span" )[0];
        theSpan.innerHTML = "+";
      }


      buttonClone.addEventListener('click', function() {
        (function (_b) {
          seeMore.touchSeeMoreExpand( _b );
        })(buttonClone);
      });

      dpsInteractions.blink.replaceBlinkReference( button, buttonClone );


      for ( var i = 0; i < seeMore.bottomShadowArray.length; i++ ) {
        var bottomShadow = seeMore.bottomShadowArray;
        if ( bottomShadow[i].id === buttonId ) {
          $( bottomShadow[i] ).fadeIn();
          break;
        }
      }

      seeMore.buttonDetails[buttonIdString].expanded = false;
    },

    hasSeeMoreButton: function( touchedId ) {
      var seeMore = this
        , arrContainsId = false;

      for ( var i = 0; i < seeMore.buttonArray.length; i++ ) {
        if ( seeMore.buttonArray[i].id == touchedId ) {
          arrContainsId = true;
          break;
        }
      }

      if ( arrContainsId === true ) {
        //console.log( "that button is here" );
        return true;
      } else {
        return false;
      }
    },

    resizeSeeMoreHolder: function( button, buttonIdString ) {

      var seeMore = this
        , detailsObject = seeMore.buttonDetails[ buttonIdString ];


      if ( detailsObject.expanded === true ) {
        var selectedHolder = detailsObject.holder;

        console.log(selectedHolder.childNodes);

        var ec = dpsInteractions.tap.tapDetails.show[buttonIdString];
        console.log(ec);
        for( var i = 0; i < ec.elementsActive.length; i++) {
          if ( ec.elementsActive[ i ] == true ) {
            var actualHeight = ec.options[ i ].scrollHeight;
          }
        }
        console.log(dpsInteractions.tap.tapDetails.show[ buttonIdString ])

        $( selectedHolder ).animate({height: actualHeight + "px"}, 250 );
      }
    }

  },
}

*/
