document.querySelector(".control-button span").onclick = function () {
    let yourName = prompt("Whats Your Name?");
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-button").remove();
}

let duration = 1000,
    blocksContainer = document.querySelector(".game-block-container"),
    blocks = Array.from(blocksContainer.children),
    orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index]
    block.addEventListener("click", function () {
        flibBlock(block);
    })
});


function shuffle(array) {
    let current = orderRange.length,
        temp,
        random;
    while(current > 0) {
        random = Math.floor(Math.random() * 19);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
}

function flibBlock(selectedBlock) {
    selectedBlock.classList.add("flipped");
    let flippedBlocks = blocks.filter(flippedBlock => flippedBlock = flippedBlock.classList.contains("flipped"));
    if (flippedBlocks.length == 2) {
        stopClicking();
        checking(flippedBlocks[0], flippedBlocks[1]);
    }
}

function stopClicking() {
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking");
    }, duration)
}

function checking(firstblock, secondblock) {
    let tries = document.querySelector(".tries span");
    if (firstblock.dataset.tech == secondblock.dataset.tech) {
        firstblock.classList.remove("flipped");
        secondblock.classList.remove("flipped");
        firstblock.classList.add("match");
        secondblock.classList.add("match");
    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        setTimeout(() => {
            firstblock.classList.remove("flipped");
            secondblock.classList.remove("flipped");
        }, duration)
    }
}