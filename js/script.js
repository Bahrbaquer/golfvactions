document.addEventListener('DOMContentLoaded', () => {
    const budgetTypeSelect = document.getElementById('budget-type');
    const perPersonBudgetContainer = document.getElementById('per-person-budget-container');
    const groupTotalBudgetContainer = document.getElementById('group-total-budget-container');
    const perPersonBudgetInput = document.getElementById('per-person-budget');
    const groupTotalBudgetInput = document.getElementById('group-total-budget');

    // Show/hide budget fields based on selection
    budgetTypeSelect.addEventListener('change', () => {
        const selectedValue = budgetTypeSelect.value;

        if (selectedValue === 'per-person') {
            perPersonBudgetContainer.style.display = 'block';
            groupTotalBudgetContainer.style.display = 'none';
            perPersonBudgetInput.disabled = false;
            groupTotalBudgetInput.disabled = true;
        } else if (selectedValue === 'total-trip') {
            perPersonBudgetContainer.style.display = 'none';
            groupTotalBudgetContainer.style.display = 'block';
            perPersonBudgetInput.disabled = true;
            groupTotalBudgetInput.disabled = false;
        } else {
            perPersonBudgetContainer.style.display = 'none';
            groupTotalBudgetContainer.style.display = 'none';
            perPersonBudgetInput.disabled = true;
            groupTotalBudgetInput.disabled = true;
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

    const golfDaysSelect = document.getElementById('golf-days');
    const golfHolesContainer = document.getElementById('golf-holes-container');

    // Generate golf holes per day based on the selected number of days
    golfDaysSelect.addEventListener('change', () => {
        const numberOfDays = parseInt(golfDaysSelect.value, 10);
        golfHolesContainer.innerHTML = ''; // Clear previous content

        if (numberOfDays) {
            golfHolesContainer.style.display = 'block';

            for (let day = 1; day <= numberOfDays; day++) {
                const dayContainer = document.createElement('div');
                dayContainer.classList.add('form-row');
                dayContainer.innerHTML = `
                    <h5>Day ${day}</h5>
                    <div class="form-group">
                        <div class="radio-group">
                            <label><input type="radio" name="holes_day_${day}" value="9" required> 9 Holes</label>
                            <label><input type="radio" name="holes_day_${day}" value="18" required> 18 Holes</label>
                            <label><input type="radio" name="holes_day_${day}" value="27" required> 27 Holes</label>
                            <label><input type="radio" name="holes_day_${day}" value="36" required> 36 Holes</label>
                        </div>
                    </div>
                `;
                golfHolesContainer.appendChild(dayContainer);
            }
        } else {
            golfHolesContainer.style.display = 'none';
        }
    });
});