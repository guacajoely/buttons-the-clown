import { fetchClowns, fetchCompletions, fetchRequests } from "./dataAccess.js"
import { createHTML } from "./createHTML.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
        .then(() => fetchClowns())
        .then(() => fetchCompletions())
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