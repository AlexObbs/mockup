document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    const addButton = document.getElementById('add-row');
    const ctx = document.getElementById('plot').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: []
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'X-Axis Score'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y-Axis Score'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.raw.label;
                        }
                    }
                }
            }
        }
    });

    const updateChart = () => {
        const rows = table.getElementsByTagName('tr');
        const data = [];

        for (const row of rows) {
            const name = row.querySelector('.name-field').value;
            const xValue = parseFloat(row.querySelector('.x-value').textContent);
            const yValue = parseFloat(row.querySelector('.y-value').textContent);
            
            if (name) {
                data.push({
                    x: xValue,
                    y: yValue,
                    label: name
                });
            }
        }

        chart.data.datasets = [{
            label: 'Scores',
            data: data,
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }];
        chart.update();
    };

    const addRow = () => {
        if (table.rows.length >= 30) return;

        const row = table.insertRow();
        row.innerHTML = `
            <td><input type="text" class="name-field" placeholder="Name"></td>
            <td><input type="range" class="x-slider" min="0" max="10" value="0"> <span class="x-value">0</span></td>
            <td><input type="range" class="y-slider" min="0" max="10" value="0"> <span class="y-value">0</span></td>
            <td><button class="remove-row">Remove</button></td>
        `;

        // Attach event listeners for sliders and remove button
        row.querySelector('.x-slider').addEventListener('input', (e) => {
            const xValueElem = row.querySelector('.x-value');
            xValueElem.textContent = e.target.value;
            updateChart();
        });
        row.querySelector('.y-slider').addEventListener('input', (e) => {
            const yValueElem = row.querySelector('.y-value');
            yValueElem.textContent = e.target.value;
            updateChart();
        });
        row.querySelector('.remove-row').addEventListener('click', () => {
            row.remove();
            updateChart();
        });
    };

    const initializeRows = () => {
        // Attach event listeners to existing rows
        table.querySelectorAll('tr').forEach(row => {
            row.querySelector('.x-slider').addEventListener('input', (e) => {
                const xValueElem = row.querySelector('.x-value');
                xValueElem.textContent = e.target.value;
                updateChart();
            });
            row.querySelector('.y-slider').addEventListener('input', (e) => {
                const yValueElem = row.querySelector('.y-value');
                yValueElem.textContent = e.target.value;
                updateChart();
            });
        });
    };

    // Initialize the chart and event listeners
    addButton.addEventListener('click', addRow);
    initializeRows(); // Ensure all rows have listeners on page load

    // Initial chart update
    updateChart();
});
