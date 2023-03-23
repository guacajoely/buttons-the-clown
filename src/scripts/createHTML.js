import { ServiceForm } from "./ServiceForm.js"
import { Requests } from "./Requests.js"

export const createHTML = () => {
    return `
    <h1>Buttons and Lollipop the Clowns</h1>
    <section class="serviceForm">
        ${ServiceForm()}
    </section>
    <section class="serviceRequests">
        <h2>Service Requests</h2>
        ${Requests()}
    </section>
    `
}