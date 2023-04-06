
  setTimeout(()=>{
    console.log($("#slider"))
  window.slider = $('#slider').cardSlider({
    slideTag: 'div'
    , slideClass: 'slide'
    , current: 1
    , followingClass: 'slider-content-6'
    , delay: 300
    , transition: 'ease'
    , onBeforeMove: function(slider, onMove) {
      console.log('onBeforeMove')
      onMove()
    }
    , onMove: function(slider, onAfterMove) {
      onAfterMove()
    }
    , onAfterMove: function() {
      console.log('onAfterMove')
    }
    , onAfterTransition: function() {
      console.log('onAfterTransition')
    }
    , onCurrent: function() {
      console.log('onCurrent')
    }
  });

  },100)
