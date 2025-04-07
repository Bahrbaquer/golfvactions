document.addEventListener('DOMContentLoaded', () => {
    const budgetTypeSelect = document.getElementById('budget-type');
    const perPersonBudgetContainer = document.getElementById('per-person-budget-container');
    const groupTotalBudgetContainer = document.getElementById('group-total-budget-container');

    // Show/hide budget fields based on selection
    budgetTypeSelect.addEventListener('change', () => {
        const selectedValue = budgetTypeSelect.value;

        if (selectedValue === 'per-person') {
            perPersonBudgetContainer.style.display = 'block';
            groupTotalBudgetContainer.style.display = 'none';
        } else if (selectedValue === 'total-trip') {
            perPersonBudgetContainer.style.display = 'none';
            groupTotalBudgetContainer.style.display = 'block';
        } else {
            perPersonBudgetContainer.style.display = 'none';
            groupTotalBudgetContainer.style.display = 'none';
        }
    });

    const groupSizeInput = document.getElementById('group-size');
    const departureLocationsContainer = document.getElementById('departure-locations');
    const addLocationButton = document.getElementById('add-location');
    const locationWarning = document.getElementById('location-warning');
    const form = document.querySelector('form');

    let locationCount = 1;

    // Add a new departure location
    addLocationButton.addEventListener('click', () => {
        locationCount++;
        const newLocation = document.createElement('div');
        newLocation.classList.add('departure-location');
        newLocation.innerHTML = `
            <div class="form-row">
            <div class="form-group">
            <label for="departure-${locationCount}">Location (City, State)</label>
            <input type="text" id="departure-${locationCount}" name="departure_locations[]" placeholder="Enter departure location" required>
            </div>
            <div class="form-group">
            <label for="departure-count-${locationCount}">Number of People</label>
            <input type="number" id="departure-count-${locationCount}" name="departure_counts[]" placeholder="Enter number of people" required>
            </div>
            </div>
            <button type="button" class="remove-location">Remove</button>
            
        `;
        departureLocationsContainer.appendChild(newLocation);

        // Add event listener to the "Remove" button
        newLocation.querySelector('.remove-location').addEventListener('click', () => {
            newLocation.remove();
        });
    });

    // Validate total group size on form submission
    form.addEventListener('submit', (e) => {
        const groupSize = parseInt(groupSizeInput.value, 10);
        const departureCounts = Array.from(document.querySelectorAll('[name="departure_counts[]"]'))
            .map(input => parseInt(input.value, 10) || 0);
        const totalDepartureCount = departureCounts.reduce((sum, count) => sum + count, 0);

        if (totalDepartureCount !== groupSize) {
            e.preventDefault();
            locationWarning.style.display = 'block';
            locationWarning.textContent = `The total number of people (${totalDepartureCount}) must match the group size (${groupSize}).`;
        } else {
            locationWarning.style.display = 'none';
        }
    });

    // Reset warning when group size changes
    groupSizeInput.addEventListener('input', () => {
        locationWarning.style.display = 'none';
    });
});