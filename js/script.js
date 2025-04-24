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

// multi-page form
document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.form-page');
    let currentPage = 0;

    // Show the current page and hide the others
    function showPage(pageIndex) {
        pages.forEach((page, index) => {
            page.style.display = index === pageIndex ? 'block' : 'none';
        });
    }

    // Move to the next page
    function nextPage() {
        if (currentPage < pages.length - 1) {
            currentPage++;
            showPage(currentPage);
        }
    }

    // Move to the previous page
    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    }

    // Attach event listeners to navigation buttons
    document.getElementById('next-1').addEventListener('click', nextPage);
    document.getElementById('next-2').addEventListener('click', nextPage);
    document.getElementById('prev-2').addEventListener('click', prevPage);
    document.getElementById('prev-3').addEventListener('click', prevPage);

    // Initialize the first page
    showPage(currentPage);
});

// Page 2 checkbox inputs and functionality
document.addEventListener('DOMContentLoaded', () => {
    // Travel radio button logic
    const travelYesRadio = document.getElementById('travel-needed');
    const travelNoRadio = document.getElementById('no-travel-needed');
    const travelDetails = document.getElementById('travel-details');
    const numTravelersInput = document.getElementById('num-travelers');
    const departureCitiesContainer = document.getElementById('departure-cities');

    // Show or hide travel details based on selection
    travelYesRadio.addEventListener('change', () => {
        if (travelYesRadio.checked) {
            travelDetails.style.display = 'block';
        }
    });

    travelNoRadio.addEventListener('change', () => {
        if (travelNoRadio.checked) {
            travelDetails.style.display = 'none';
            numTravelersInput.value = ''; // Clear the number of travelers
            departureCitiesContainer.innerHTML = ''; // Clear departure cities
        }
    });

    // Dynamically add departure city inputs based on the number of travelers
    numTravelersInput.addEventListener('input', () => {
        const numTravelers = parseInt(numTravelersInput.value, 10) || 0;
        departureCitiesContainer.innerHTML = ''; // Clear existing inputs
        for (let i = 1; i <= numTravelers; i++) {
            const label = document.createElement('label');
            label.setAttribute('for', `departure-city-${i}`);
            label.textContent = `Departure City/Zip for Traveler ${i}:`;

            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('id', `departure-city-${i}`);
            input.setAttribute('name', `departure-city-${i}`);
            input.setAttribute('placeholder', 'Enter city');

            departureCitiesContainer.appendChild(label);
            departureCitiesContainer.appendChild(input);
        }
    });

    // Transportation radio button logic
    const transportationYesRadio = document.getElementById('transportation-needed');
    const transportationNoRadio = document.getElementById('no-transportation-needed');
    const transportationDetails = document.getElementById('transportation-details');
    const numSeatsInput = document.getElementById('num-seats');

    // Show or hide transportation details based on selection
    transportationYesRadio.addEventListener('change', () => {
        if (transportationYesRadio.checked) {
            transportationDetails.style.display = 'block';
        }
    });

    transportationNoRadio.addEventListener('change', () => {
        if (transportationNoRadio.checked) {
            transportationDetails.style.display = 'none';
            numSeatsInput.value = ''; // Clear the number of seats/vehicles
        }
    });
});
// Page 3 functionality 
document.addEventListener('DOMContentLoaded', () => {
    // Best Contact Method logic
    const contactEmailCheckbox = document.getElementById('contact-email');
    const contactPhoneCheckbox = document.getElementById('contact-phone');
    const contactTextCheckbox = document.getElementById('contact-text');
    const emailInput = document.getElementById('email-input');
    const phoneInput = document.getElementById('phone-input');
    const textInput = document.getElementById('text-input');

    // Show or hide email input
    contactEmailCheckbox.addEventListener('change', () => {
        emailInput.style.display = contactEmailCheckbox.checked ? 'block' : 'none';
        if (!contactEmailCheckbox.checked) emailInput.value = ''; // Clear input if unchecked
    });

    // Show or hide phone input
    contactPhoneCheckbox.addEventListener('change', () => {
        phoneInput.style.display = contactPhoneCheckbox.checked ? 'block' : 'none';
        if (!contactPhoneCheckbox.checked) phoneInput.value = ''; // Clear input if unchecked
    });

    // Show or hide text input
    contactTextCheckbox.addEventListener('change', () => {
        textInput.style.display = contactTextCheckbox.checked ? 'block' : 'none';
        if (!contactTextCheckbox.checked) textInput.value = ''; // Clear input if unchecked
    });
});