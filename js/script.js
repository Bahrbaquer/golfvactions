// Mobile Menu toggle
function toggleNav() {
    const toggleNav = document.getElementById('toggleMenu');
    toggleNav.classList.toggle('openMenu');
}

// Enforce minimum date range of 2.5 weeks (17 days) from today
const today = new Date();
const minStartDate = new Date(today);
minStartDate.setDate(today.getDate() + 17);

const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const holesInput = document.getElementById('holes'); // Declare once here
const daysInput = document.getElementById('days');
const averageHolesSpan = document.getElementById('average_holes');

// Set minimum start date
startDateInput.min = minStartDate.toISOString().split('T')[0];

// Disable end date input initially
endDateInput.disabled = true;

// Enable and update end date minimum based on selected start date
startDateInput.addEventListener('change', () => {
    if (startDateInput.value) {
        const selectedStartDate = new Date(startDateInput.value);
        const minEndDate = new Date(selectedStartDate);
        minEndDate.setDate(selectedStartDate.getDate() + 1); // At least 1 day trip
        endDateInput.min = minEndDate.toISOString().split('T')[0];
        endDateInput.disabled = false; // Enable the end date input
    } else {
        endDateInput.disabled = true; // Keep it disabled if no start date is selected
    }
});

// Validate that the number of holes is divisible by 9
holesInput.addEventListener('input', () => {
    const value = parseInt(holesInput.value, 10);
    if (value % 9 !== 0) {
        holesInput.setCustomValidity('The number of holes must be divisible by 9.');
    } else {
        holesInput.setCustomValidity(''); // Clear the error message
    }
});

