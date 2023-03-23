import { sendRequest } from "./dataAccess.js"

export const ServiceForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="serviceParentName">Parent Name</label>
            <input type="text" name="serviceParentName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceChildName">Child Name</label>
            <input type="text" name="serviceChildName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceAttendees">How many children attending?</label>
            <input type="number" name="serviceAttendees" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceAddress">Address</label>
            <input type="text" name="serviceAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceDate">Date needed</label>
            <input type="date" name="serviceDate" class="input" />
        </div>
        <div class="field">
            <label class="label" for="serviceDuration">How long will the party be? (in hours)</label>
            <input type="number" name="serviceDuration" class="input" />
        </div>

        <button class="request__submit" id="submitRequest">Submit Request</button>
    `

    return html
}



const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const userParentName = document.querySelector("input[name='serviceParentName']").value
        const userChildName = document.querySelector("input[name='serviceChildName']").value
        const userAttendees = document.querySelector("input[name='serviceAttendees']").value
        const userAddress = document.querySelector("input[name='serviceAddress']").value
        const userDate = document.querySelector("input[name='serviceDate']").value
        const userDuration = document.querySelector("input[name='serviceDuration']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            parentName: userParentName,
            childName: userChildName,
            attendeeCount: userAttendees,
            address: userAddress,
            date: userDate,
            durationInHours: userDuration,
            completed: false
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
    }
})