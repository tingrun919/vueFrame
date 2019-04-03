(function (window, document) {
  function resize () {
    var ww = window.innerWidth
    if (ww > window.screen.width) {
      window.requestAnimationFrame(resize)
    } else {
      if (ww > 750) {
        ww = 750
      }
      document.documentElement.style.fontSize = (ww * 100) / 750 + 'px'
      document.documentElement.style.backgroundColor = '#F2F2F2'
    }
  }

  resize()

  window.addEventListener('resize', resize)
})(window, document)
