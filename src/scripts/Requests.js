import { getRequests, sendRequest, deleteRequest, saveCompletion, markCompletionsComplete, getClowns, getCompletions } from "./dataAccess.js"
import { createClownDropdown } from "./clowns.js"

export const Requests = () => {

    //MARK REQUESTS COMPLETE BEFORE STORING REQUESTS!!!
    markCompletionsComplete()
    const requests = getRequests()

    let html = `<ul>${requests.map(convertRequestToListElement).join("")}</ul>`
    return html
}

const convertRequestToListElement = (objectFromArray) => {

    if(!objectFromArray.completed){

    return `
    <li>
        <div class="party">
            <img src="./images/icon.png">
            <div class="child">${objectFromArray.childName}</div>
            <div class="address">${objectFromArray.address}</div>
        </div>
        <div class='clowns'>
        ${createClownDropdown(objectFromArray)}
        </div>
        <button class="request__delete"
                id="request--${objectFromArray.id}">
            Deny
        </button>
    </li>`   
    }

    else{

        //get most current completions and clown arrays inside function
        const completions = getCompletions()
        const clowns = getClowns()

        //now we need to grab the plumbers name
        for(const completion of completions){
            if(objectFromArray.id === parseInt(completion.requestId)){
                const matchingClown = clowns.find((clown) => {
                    return parseInt(completion.clownId) === clown.id
                })


            return `
            <li>
                <div class="party">
                    <img src="./images/icon.png">
                    <div class="child">${objectFromArray.childName}</div>
                    <div class="address">${objectFromArray.address}</div>
                </div>
                <div class='clown'>
                completed by ${matchingClown.name}
                </div>
                <button class="request__delete" id="request--${objectFromArray.id}"> Deny </button>
            </li>`   
            }
        }
    }
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})


mainContainer.addEventListener("change",(event) => {

    if (event.target.id === "clowns") {
    
        //GRAB THE IDS FROM THE OPTION'S ID
        const [requestId, clownId] = event.target.value.split("--")

        // CREATE A NEW COMPLETION OBJECT
        const completion = { 
            requestId: requestId,
            clownId: clownId,
            timestamp: `${Date.now()}`
        }

        //CALL THE SAVECOMPLETION FUNCTION PASSING IN THE OBJECT WE JUST CREATED
        saveCompletion(completion)
        console.log(`A completion has been created for request #${requestId}`)
    }
})