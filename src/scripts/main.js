import { fetchRequests } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
        .then(
            () => {
                mainContainer.innerHTML = createHTML()
            }
        )
}

render()

mainContainer.addEventListener("stateChanged", customEvent => {
    render()
}
)