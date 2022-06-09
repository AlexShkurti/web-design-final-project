$(".hamburger").click(() => {
  $(".side-nav").addClass("open");
  $(".backdrop").addClass("active");
});

$(".backdrop").click(() => {
  $(".side-nav").removeClass("open");
  $(".backdrop").removeClass("active");
});

$(".close").click(() => {
  $(".side-nav").removeClass("open");
  $(".backdrop").removeClass("active");
});
