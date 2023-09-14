function locoScroll(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
el: document.querySelector("#main"),
smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
scrollTop(value) {
  return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
}, // we don't have to define a scrollLeft because we're only scrolling vertically.
getBoundingClientRect() {
  return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
},
// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locoScroll();


var tl = gsap.timeline();
tl.from("#heroC>h1,#heroC>h3",{
  opacity:0,
  stagger:0.4,
  duration:1,
  transform:"translateY(100%)"
})

var tl1 = gsap.timeline({
  scrollTrigger:{
    scroller:"#main",
    trigger:"#page2",
    scrub:1,
    start:"top 0%",
    end:"top -100%",
    pin:true
  }
})

tl1.from("#page2T,#page2C",{
  opacity:0,
  transform:"translateX(-100%)",
  stagger:.3,
  
})

tl1.to("#imgText",{
  left:"5%"
})


var tl2 = gsap.timeline({
  scrollTrigger:{
    scroller:"#main",
    trigger:"#page3",
    scrub:1,
    start:"top 0%",
    end:"top -100%",
    pin:true
  }
})

tl2.from("#page3T>svg",{
  opacity:0
})
tl2.from("#page3C>h1",{
  opacity:0,
  transform:"translateX(100%)"
})
.from("#page3C>p",{
  scale:0
})


var tl3 = gsap.timeline({
  scrollTrigger:{
    scroller:"#main",
    trigger:"#footer",
    scrub:1,
    start:"top 0%",
    end:"top -100%",
    pin:true
  }
})
tl3.from("#footerR>svg",{
  opacity:0,
  scale:0
})
.from("#footerLT,#footerLC",{
  transform:"translateX(-100%)",
  stagger:.3
})
.from("#footerLB",{
  transform:"translateY(100%)",
  opacity:0
})
