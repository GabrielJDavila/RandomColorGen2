// declaring global variable for multiple use
const copyInput = document.getElementById("rendered-input")

function getID(id) {
    return document.getElementById(id)
}
// function to fetch data and position html
const fetchData = () => {
    let colorValue = getID("color-picker").value.slice(1)
    let colorMode = getID("select-menu").value
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorValue}&mode=${colorMode}&count=6`)
        .then(res => res.json())
        .then(data => {
            let colorHtml = ''
            let colorScheme = data.colors
            console.log(colorScheme)
            colorScheme.map(color => {
                let colorVal = color.hex.value
                colorHtml += `
                    <div class="rendered-color-container" style="background:${colorVal}">
                        <div id=${colorVal} class="color-column" style="background:${colorVal}">
                            <p class="hide">placeholder</p>
                        </div>
                        <h3 class="color-text">${colorVal}</h3>
                    </div>
                `
            })
            
            getID("generated-colors-container").innerHTML = colorHtml 
            
            getID("generated-colors-container").addEventListener("click", (e) => {
                if(e.target.classList.contains(".color-column")) {
                    copyInput.value = e.target.id
                    copyInput.select()
                    document.execCommand("copy")
                    console.log(document.execCommand("copy"))
                } else {
                    copyInput.value = e.target.innerHTML
                    copyInput.select()
                    document.execCommand("copy")
                    console.log(document.execCommand("copy"))
                }
            })
            // logic to make values copy to clipboard. Top one with columns is for clicking color columns, bottom one is when user clicks color value text below each column. Clipboard API doesn't work with scrimba? Is there another way to do this?
            // const columns = document.querySelectorAll(".color-column")
            // columns.forEach(col => {
            //     col.addEventListener("click", (e) => {
            //         copyInput.value = e.target.id
            //         copyInput.select()
            //         navigator.clipboard.writeText(copyInput.value)
            //     })
            // })
            
            // const colorText = document.querySelectorAll(".color-text")
            // colorText.forEach(text => {
            //     text.addEventListener("click", (e) => {
            //         copyInput.value = e.target.innerHTML
            //         copyInput.select()
            //         navigator.clipboard.writeText(copyInput.value)
            //     })
            // })
        })
}

// function to render on the page
const render = (e) => {
    fetchData()
    e.preventDefault()
}

// event listener when form is submitted
document.getElementById("color-picker-container").addEventListener("submit", render)