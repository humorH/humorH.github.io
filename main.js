$ = (queryString) => document.querySelector(queryString);
let input = "";
let playing = "";
let timeout = null;
let sounds = ["audio/one.m4a", "audio/two.m4a", "audio/three.m4a", "audio/four.m4a"];
let videos = {
    jojoT: "video/jojoRabbit.mp4",
    jojoB: "video/jojoRabbit.mp4",
    ingT: "video/ing.mp4",
    ingB: "video/ing.mp4",
    lifT: "video/lifeIs.mp4",
    lifB: "video/lifeIs.mp4",
    noneB: "",
    noneT: ""

}
let opts = "";

let vid = "";




AFRAME.registerComponent('cursor-v', {
    init: function () {
        this.el.addEventListener('mousedown', function (evt) {
            vid = this.id;
            if (videos[vid] == "") {
                $("#cin").pause();
            } else {
                requestAnimationFrame(animateB)
            }
           
        });
    }
});

document.addEventListener('keydown', (a) => {
    let that = this;
    if (timeout != null) {
        clearTimeout(timeout)
    }
    timeout = setTimeout(function () {

        if (a.key == "Enter" && parseInt(input) <= sounds.length) {
            opts = `src: ${sounds[parseInt(input) - 1]}; autoplay: true; positional: false;`
            $("#sound").setAttribute("sound", opts)
            $("#cin").pause();
            playing = input
            input = ""
        } else if (input.length < 2 && !isNaN(a.key)) {
            input += a.key;
        } else if (a.key == "Backspace" && input.length >= 1) {
            input = input.split("")
            input = input.splice(0, input.leng)
            input = input.join("")

        }

        requestAnimationFrame(animateA);
    }, 100)

});



const animateA = () => {
    $('#code').setAttribute("value", "Enter Audiotour Number: " + input);
    $('#playing').setAttribute("value", "Playing: " + playing);
};

const animateB = () => {
    $("#cin").setAttribute("src", videos[vid]);
    $("#cin").play();
    
    
}

AFRAME.registerComponent('video-handler',{
    init: function() {
     let el = this.el;
     let vid = $("#cin")
     el.addEventListener('mousedown', function() {
        vid.pause();
        // alert("hi");
     });
    }
  });
