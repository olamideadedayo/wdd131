// Wait for the DOM to load before running script
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const serviceSelect = document.getElementById("service");
    const extraField = document.createElement("div");
    extraField.innerHTML = `
        <label for="model">Select Refrigerator Model:</label>
        <input type="text" id="model" name="model" placeholder="Enter model name">
    `;
    extraField.style.display = "none";
    form.insertBefore(extraField, form.lastElementChild);

    // Show/hide extra field based on selected service
    serviceSelect.addEventListener("change", () => {
        if (serviceSelect.value === "installation") {
            extraField.style.display = "block";
        } else {
            extraField.style.display = "none";
        }
    });

    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent actual form submission
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value;
        const model = document.getElementById("model") ? document.getElementById("model").value : "N/A";
        
        // Validate input fields
        if (!name || !email || !phone || !date || !time || !service) {
            alert("Please fill out all required fields.");
            return;
        }
        
        // Store appointment details in localStorage
        const appointment = { name, email, phone, date, time, service, model, message };
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));
        
        alert(`Thank you, ${name}! Your ${service} appointment is scheduled for ${date} at ${time}.`);
        form.reset();
    });

    // Display stored appointments
    const appointmentSection = document.createElement("section");
    appointmentSection.innerHTML = `<h2>Upcoming Appointments</h2><ul id="appointmentList"></ul>`;
    document.body.appendChild(appointmentSection);

    function loadAppointments() {
        const appointmentList = document.getElementById("appointmentList");
        appointmentList.innerHTML = "";
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.forEach((app, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${app.name}</strong> - ${app.service} on ${app.date} at ${app.time}
                <button onclick="deleteAppointment(${index})">❌</button>
            `;
            appointmentList.appendChild(li);
        });
    }

    // Delete appointment function
    window.deleteAppointment = (index) => {
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.splice(index, 1);
        localStorage.setItem("appointments", JSON.stringify(appointments));
        loadAppointments();
    };

    loadAppointments(); // Load appointments on page load
});
