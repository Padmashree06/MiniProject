async function loadUsers() {
  const container = document.getElementById('table-container');
  container.innerHTML = 'Loading...';

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');

    // Debug log
    console.log("Response status:", res.status);

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    console.log("Data received:", data);

    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = 'No data found.';
      return;
    }

    const columns = Object.keys(data[0]);

    const table = document.createElement('table');
    const thead = table.createTHead();
    const headRow = thead.insertRow();

    columns.forEach(col => {
      const th = document.createElement('th');
      th.textContent = col;
      headRow.appendChild(th);
    });

    const tbody = document.createElement('tbody');
    data.forEach(rowObj => {
      const tr = document.createElement('tr');
      columns.forEach(col => {
        const td = document.createElement('td');
        let cellData = rowObj[col];

        if (typeof cellData === 'object' && cellData !== null) {
          cellData = JSON.stringify(cellData);
        }

        td.textContent = cellData;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.innerHTML = '';
    container.appendChild(table);

  } catch (err) {
    container.innerHTML = '❌ Error loading data';
    console.error("Fetch failed:", err);
  }
}

loadUsers();
setInterval(() => loadTable('students'), 5000);
