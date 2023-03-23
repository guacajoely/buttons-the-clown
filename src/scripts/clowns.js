import { getClowns } from "./dataAccess.js"

export const createClownDropdown = (request) => {
    const clowns = getClowns()

    return `<select class="clowns" id="clowns">
            <option value="0">Completed by</option>
            
            ${clowns.map(clown => {
                return `<option value="${request.id}--${clown.id}">${clown.name}</option>`
            }).join("")}
            
            </select>`
}