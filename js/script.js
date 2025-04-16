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
    const groupDetailsContainer = document.getElementById('group-details');
    const addGolferButton = document.getElementById('add-golfer');
    const summaryTableContainer = document.getElementById('summary-table-container');
    const summaryTableBody = document.querySelector('#summary-table tbody');
    const totalGolfersElement = document.getElementById('total-golfers');
    let golferCount = 0;

    // Function to update the summary table
    function updateSummaryTable() {
        const golfers = document.querySelectorAll('.golfer-details');
        summaryTableBody.innerHTML = ''; // Clear the table

        golfers.forEach((golfer, index) => {
            const golferNameInput = golfer.querySelector('.golfer-name');
            const clubRentalCheckbox = golfer.querySelector('.club-rental');
            const travelCheckbox = golfer.querySelector('.needs-travel');

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${golferNameInput.value || `Golfer ${index + 1}`}</td>
                <td>${clubRentalCheckbox.checked ? 'Yes' : 'No'}</td>
                <td>${travelCheckbox.checked ? 'Yes' : 'No'}</td>
            `;
            summaryTableBody.appendChild(row);
        });

        // Update total golfers count
        totalGolfersElement.textContent = golfers.length;

        // Show or hide the summary table
        summaryTableContainer.style.display = golfers.length > 0 ? 'block' : 'none';
    }

    // Function to add a new golfer
    function addGolfer() {
        golferCount++;
        const golferDiv = document.createElement('div');
        golferDiv.classList.add('golfer-details');
        golferDiv.innerHTML = `
            <label for="golfer-name-${golferCount}">Golfer Name:</label>
            <input type="text" id="golfer-name-${golferCount}" class="golfer-name" name="golfer-name-${golferCount}" required>
            <div class="flex-2">
            <div>
            <label>
                <input type="checkbox" class="club-rental" id="club-rental-${golferCount}">
                Rental Clubs
            </label>
            <br>
            <label>
                <input type="checkbox" class="needs-travel" id="needs-travel-${golferCount}">
                Needs Travel
            </label>
            </div>
            <div>
            <button type="button" class="remove-golfer">remove</button>
            </div>
            </div>
        `;
        groupDetailsContainer.appendChild(golferDiv);

        // Add event listeners for the new golfer
        golferDiv.querySelector('.golfer-name').addEventListener('input', updateSummaryTable);
        golferDiv.querySelector('.club-rental').addEventListener('change', updateSummaryTable);
        golferDiv.querySelector('.needs-travel').addEventListener('change', updateSummaryTable);
        golferDiv.querySelector('.remove-golfer').addEventListener('click', () => {
            golferDiv.remove();
            updateSummaryTable();
        });

        updateSummaryTable();
    }

    // Event listener for "Add Golfer" button
    addGolferButton.addEventListener('click', addGolfer);

    // Initialize with one golfer
    addGolfer();
});