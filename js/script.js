// Mobile Menu toggle
function toggleNav() {
    const toggleNav = document.getElementById('toggleMenu');
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

    // Function to calculate total days and populate trip days
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

    // Function to populate trip days with radio buttons for holes
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
                <h6># of Holes</h6>
                <input type="radio" id="zero-day-${i}" name="Day${i}" value="0">
                <label for="zero-day-${i}">0 Holes</label>
                <br>
                <input type="radio" id="nine-day-${i}" name="Day${i}" value="9">
                <label for="nine-day-${i}">9 Holes</label>
                <br>
                <input type="radio" id="eighteen-day-${i}" name="Day${i}" value="18">
                <label for="eighteen-day-${i}">18 Holes</label>
                <br>
                <input type="radio" id="twenty-seven-day-${i}" name="Day${i}" value="27">
                <label for="twenty-seven-day-${i}">27 Holes</label>
                <br>
                <input type="radio" id="thirty-six-day-${i}" name="Day${i}" value="36">
                <label for="thirty-six-day-${i}">36 Holes</label>
                <br>
            `;
            tripDaysContainer.appendChild(dayDiv);
        }
    }

    // Function to clear trip days
    function clearTripDays() {
        tripDaysContainer.innerHTML = ''; // Clear all days
    }

    // Attach event listeners to both date inputs
    startInput.addEventListener('change', calculateTotalDays);
    endInput.addEventListener('change', calculateTotalDays);

    // Ensure the end date cannot be earlier than the start date
    startInput.addEventListener('change', () => {
        endInput.min = startInput.value; // Set end date to be no earlier than the start date
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const startInput = document.getElementById('start-of-trip');
    const endInput = document.getElementById('end-of-trip');
    const today = new Date();
    const minStartDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000); // Add 14 days
    const minStartDateString = minStartDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    // Set the minimum start date immediately
    startInput.min = minStartDateString;

    // Ensure the end date cannot be earlier than the start date
    startInput.addEventListener('change', () => {
        const startDate = new Date(startInput.value);
        if (startDate < minStartDate) {
            alert(`Start date must be at least 2 weeks from today (${minStartDateString}).`);
            startInput.value = ''; // Clear invalid input
        } else {
            endInput.min = startInput.value; // Update the minimum end date
        }
    });

    endInput.addEventListener('change', () => {
        const startDate = new Date(startInput.value);
        const endDate = new Date(endInput.value);
        if (endDate < startDate) {
            alert('End date must be after the start date.');
            endInput.value = ''; // Clear invalid input
        }
    });
});

// form to have multiple pages
document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.form-page');
    let currentPage = 0; // Start on the first page

    // Navigation buttons
    const nextToPage2 = document.getElementById('next-to-page-2');
    const backToPage1 = document.getElementById('back-to-page-1');
    const nextToPage3 = document.getElementById('next-to-page-3');
    const backToPage2 = document.getElementById('back-to-page-2');

    // Show the current page and hide others
    function showPage(pageIndex) {
        pages.forEach((page, index) => {
            page.style.display = index === pageIndex ? 'block' : 'none';
        });
    }

    // Event listeners for navigation
    nextToPage2.addEventListener('click', () => {
        currentPage = 1; // Move to Page 2
        showPage(currentPage);
    });

    backToPage1.addEventListener('click', () => {
        currentPage = 0; // Move back to Page 1
        showPage(currentPage);
    });

    nextToPage3.addEventListener('click', () => {
        currentPage = 2; // Move to Page 3
        showPage(currentPage);
    });

    backToPage2.addEventListener('click', () => {
        currentPage = 1; // Move back to Page 2
        showPage(currentPage);
    });

    // Show the first page initially
    showPage(currentPage);
});

// Page 2 Golfer Information Page
document.addEventListener('DOMContentLoaded', () => {
    const groupSizeInput = document.getElementById('group-size');
    const groupDetailsContainer = document.getElementById('group-details');
    const summaryTableContainer = document.getElementById('summary-table-container');
    const summaryTableBody = document.querySelector('#summary-table tbody');

    // Function to populate golfer inputs based on group size
    function populateGolferInputs(groupSize) {
        groupDetailsContainer.innerHTML = ''; // Clear existing inputs
        summaryTableBody.innerHTML = ''; // Clear the summary table

        for (let i = 1; i <= groupSize; i++) {
            const golferDiv = document.createElement('div');
            golferDiv.classList.add('golfer-details');
            golferDiv.innerHTML = `
                <label for="golfer-name-${i}">Golfer ${i} Name:</label>
                <input type="text" id="golfer-name-${i}" name="golfer-name-${i}" required>
                <br>
                <label>
                    <input type="checkbox" id="club-rental-${i}" name="club-rental-${i}">
                    Needs Rental Clubs
                </label>
                <label>
                    <input type="checkbox" id="needs-travel-${i}" name="needs-travel-${i}">
                    Needs Travel
                </label>
            `;
            groupDetailsContainer.appendChild(golferDiv);

            // Add a row to the summary table
            const row = document.createElement('tr');
            row.id = `summary-row-${i}`;
            row.innerHTML = `
                <td id="golfer-name-cell-${i}">Golfer ${i}</td>
                <td id="club-rental-cell-${i}">No</td>
                <td id="travel-cell-${i}">No</td>
            `;
            summaryTableBody.appendChild(row);

            // Add event listeners for checkboxes
            const clubRentalCheckbox = golferDiv.querySelector(`#club-rental-${i}`);
            const travelCheckbox = golferDiv.querySelector(`#needs-travel-${i}`);
            const golferNameInput = golferDiv.querySelector(`#golfer-name-${i}`);

            clubRentalCheckbox.addEventListener('change', () => {
                const cell = document.getElementById(`club-rental-cell-${i}`);
                cell.textContent = clubRentalCheckbox.checked ? 'Yes' : 'No';
            });

            travelCheckbox.addEventListener('change', () => {
                const cell = document.getElementById(`travel-cell-${i}`);
                cell.textContent = travelCheckbox.checked ? 'Yes' : 'No';
            });

            golferNameInput.addEventListener('input', () => {
                const cell = document.getElementById(`golfer-name-cell-${i}`);
                cell.textContent = golferNameInput.value || `Golfer ${i}`;
            });
        }

        // Show the summary table if group size > 0
        summaryTableContainer.style.display = groupSize > 0 ? 'block' : 'none';
    }

    // Event listener for group size input
    groupSizeInput.addEventListener('input', () => {
        const groupSize = parseInt(groupSizeInput.value, 10);
        if (groupSize > 0 && groupSize <= 20) {
            populateGolferInputs(groupSize);
        } else {
            groupDetailsContainer.innerHTML = ''; // Clear inputs if invalid
            summaryTableContainer.style.display = 'none'; // Hide the summary table
        }
    });
});