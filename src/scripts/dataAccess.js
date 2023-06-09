const applicationState = {}
const API = "http://localhost:8088"
const mainContainer = document.querySelector("#container")

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.clowns = data
            }
        )
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.completions = data
            }
        )
}

export const getRequests = () => {
    let unsortedArray = applicationState.requests.map(obj => ({ ...obj }))
    const sortedByDate = unsortedArray.sort((a, b) => a.date - b.date);
    const sortedByCompletion = sortedByDate.sort((a, b) => a.completed - b.completed);
    return sortedByCompletion
}

export const getClowns = () => {
    return applicationState.clowns.map(obj => ({ ...obj }))
}

export const getCompletions = () => {
    return applicationState.completions.map(obj => ({ ...obj }))
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

//The function whose responsiblity it is to initiate the fetch request for DELETE must have the primary key sent to it as an argument.
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const saveCompletion = (completedJob) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedJob)
    }

    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}



export const markCompletionsComplete = () => {

    let matchingRequest = null
    const requests = getRequests()
    for(const completion of applicationState.completions){
        matchingRequest = requests.find((request) => {
            return parseInt(request.id) === parseInt(completion.requestId)
        })
        for(const request of applicationState.requests){
            if(parseInt(matchingRequest.id) === parseInt(request.id)){
                request.completed = true
                console.log(`request #${request.id} has been marked complete`)
            }
        }
    }
}     