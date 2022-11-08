const colors = document.querySelectorAll(".color");
const codeColor = document.querySelector(".btn");

document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.code.toLowerCase() === "space") {
        setRandomColors();
    }
});

document.addEventListener("click", (event) => {
    console.log(event.target.dataset);
    const type = event.target.dataset.type;

    if (type === "lock") {
        const node =
            event.target.tagName.toLowerCase() === "i"
                ? event.target
                : event.target.children[0];

        node.classList.toggle("fa-lock-open");
        node.classList.toggle("fa-lock");
    } else if (type === "copy") {
        copyToClipBoard(event.target.textContent);
    }
});

// function generateRandomColor() {
//     const HexCodes = "0123456789ABCDEF";
//     let color = "";
//     for (var i = 0; i < 6; i++) {
//         color += HexCodes[Math.floor(Math.random() * HexCodes.length)];
//     }
//     return "#" + color;
// }

function copyToClipBoard(text) {
    return navigator.clipboard.writeText(text);
}

function setRandomColors(isInitial) {
    const colorsArr = isInitial ? getColorsFromHash() : [];
    // console.log(
    //     document.location.hash
    //         .substring(1)
    //         .split("-")
    //         .map((color) => {
    //             return "#" + color;
    //         })
    // );
    colors.forEach((col, index) => {
        const isLocked = col.querySelector("i").classList.contains("fa-lock");
        const text = col.querySelector("h2");
        const btn = col.querySelector("button");

        if (isLocked) {
            colorsArr.push(text.textContent);
            return;
        }

        const color = isInitial
            ? colorsArr.length
                ? colorsArr[index]
                : chroma.random()
            : chroma.random();

        if (!isInitial) {
            colorsArr.push(color);
        }

        text.textContent = color;
        col.style.background = color;

        setTextColor(text, color);
        setTextColor(btn, color);
    });
    updateColorsHash(colorsArr);
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();

    text.style.color = luminance > 0.5 ? "black" : "white";
}

function updateColorsHash(colorsArr = []) {
    document.location.hash = colorsArr
        .map((col) => {
            return col.toString().substring(1);
        })
        .join("-");
}

function getColorsFromHash() {
    let arrColorHash = [];
    if (document.location.hash.length > 1) {
        arrColorHash = document.location.hash
            .substring(1)
            .split("-")
            .map((color) => {
                return "#" + color;
            });
        return arrColorHash;
    }
    console.log(arrColorHash);
    return arrColorHash;
}

setRandomColors(true);
