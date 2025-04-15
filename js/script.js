// Calculator for total number of days in the trip

document.addEventListener('DOMContentLoaded', () => {
    const startInput = document.getElementById('start-of-trip');
    const endInput = document.getElementById('end-of-trip');
    const totalDaysElement = document.getElementById('totalDays');

    function calculateTotalDays() {
        const startDate = new Date(startInput.value);
        const endDate = new Date(endInput.value);

        if (startDate && endDate && !isNaN(startDate) && !isNaN(endDate)) {
            const timeDifference = endDate - startDate;
            const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1; // Include the start day

            if (totalDays > 0) {
                totalDaysElement.textContent = `Total Trip Length: ${totalDays} days`;
            } else {
                totalDaysElement.textContent = 'End date must be after the start date.';
            }
        } else {
            totalDaysElement.textContent = ''; // Clear the message if dates are invalid
        }
    }

    // Attach event listeners to both date inputs
    startInput.addEventListener('change', calculateTotalDays);
    endInput.addEventListener('change', calculateTotalDays);
});
//////////////////////////////////////////////////////////////