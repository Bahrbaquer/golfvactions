// Mobile Menu toggle 
function toggleNav(){
let toggleNav = document.getElementById('toggleMenu');
toggleNav.classList.toggle('openMenu');
}

// Calculator for total number of days in the trip

document.addEventListener('DOMContentLoaded', () => {
    const startInput = document.getElementById('start-of-trip');
    const endInput = document.getElementById('end-of-trip');
    const totalDaysElement = document.getElementById('totalDays');
    const tripDaysContainer = document.createElement('div'); // Container for trip days
    tripDaysContainer.id = 'trip-days';
    totalDaysElement.insertAdjacentElement('afterend', tripDaysContainer); // Add below totalDays

    // Set the minimum start date to 2 weeks from today
    const today = new Date();
    const minStartDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000); // Add 14 days
    startInput.min = minStartDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    function calculateTotalDays() {
        const startDate = new Date(startInput.value);
        const endDate = new Date(endInput.value);

        if (startDate && endDate && !isNaN(startDate) && !isNaN(endDate)) {
            const timeDifference = endDate - startDate;
            const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1; // Include the start day

            if (totalDays > 0) {
                totalDaysElement.textContent = `Total Trip Length: ${totalDays} days`;
                populateTripDays(totalDays);
            } else {
                totalDaysElement.textContent = 'End date must be after the start date.';
                clearTripDays();
            }
        } else {
            totalDaysElement.textContent = ''; // Clear the message if dates are invalid
            clearTripDays();
        }
    }

    function populateTripDays(totalDays) {
        // Clear any existing days
        tripDaysContainer.innerHTML = '';

        // Generate divs for each day
        for (let i = 1; i <= totalDays; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('trip-day');
            dayDiv.id = `day-${i}`;
            dayDiv.innerHTML = `
            <h4>Day ${i}</h4>
            <label># of Holes</label>
            <input type="radio" id="zerO" name="Day${i}" value="0">
            <label for="zerO">0 Holes</label>
            <br>
            <input type="radio" id="ninE" name="Day${i}" value="9">
            <label for="ninE">9 Holes</label>
            <br>
            <input type="radio" id="eighteeN" name="Day${i}" value="18">
            <label for="eighteeN">18 Holes</label>
            <br>
            <input type="radio" id="twenty7" name="Day${i}" value="27">
            <label for="twenty7">27 Holes</label>
            <br>
            <input type="radio" id="thirty6" name="Day${i}" value="36">
            <label for="thirty6">36 Holes</label>
            <br>
            `;
            tripDaysContainer.appendChild(dayDiv);
        }
    }

    function clearTripDays() {
        tripDaysContainer.innerHTML = ''; // Clear all days
    }

    // Attach event listeners to both date inputs
    startInput.addEventListener('change', calculateTotalDays);
    endInput.addEventListener('change', calculateTotalDays);

    startInput.addEventListener('change', () => {
        endInput.min = startInput.value; // Set end date to be no earlier than the start date
    });
});