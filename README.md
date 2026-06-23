## Quick Start

1. Run `docker-compose up`.

2. Once k6 has finished loading and shut down, open your browser and go to http://localhost:3000 (log in to Grafana with username/password: admin).

3. Go to Data Sources, add InfluxDB, point the URL to http://influxdb:8086, and name the database `k6`.

4. You can now create graphs or download a ready-made dashboard for k6 (e.g., Dashboard ID: 14801) and place it in Grafana to view the results in detail.


# Load Testing Suite 🚀

This project is a performance testing (Load Testing) suite for the system. It utilizes **k6** as the primary tool for simulating user traffic and integrates with **InfluxDB** to store metrics, which are then visualized in real-time using **Grafana**.

## 🛠️ Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 📂 Project Structure

```text
.
├── docker-compose.yml   # Services configuration (k6, InfluxDB, Grafana)
├── scripts/loadtest.js          # Main k6 load testing script
└── README.md            # This documentation file
```

## 🚀 Getting Started
### Start Services
Open a terminal in this directory and run the following command:
```bash
docker-compose up -d
```

This command will start InfluxDB and Grafana in the background, while k6 immediately begins executing the `loadtest.js` script.

### View the Grafana Dashboard
1. Open your web browser and navigate to http://localhost:3000
2. **Username:** `admin` | ***Password:*** `admin` (You will be prompted to change this upon first login)
3. Navigate to the left sidebar, select **Dashboards > Import** Enter Dashboard ID: `14801`, then click Load
4. In the Data Source dropdown at the bottom, select InfluxDB and click Import

### Run Tests Again
After the initial k6 test finishes, the container will exit. If you modify the script and wish to rerun the test, execute:
```bash
docker-compose start k6
```
(Alternatively, run `docker-compose up k6` to view the logs directly in the terminal).

### Stop & Clean Up
```bash
docker-compose down
```

### ⚙️ Configuration
You can customize the load profile and behavior within the `options` block inside scripts/`loadtest.js`:

```javascript
export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp-up: gradually increase to 20 VUs over 30 seconds
    { duration: '1m', target: 20 },  // Steady state: hold at 20 VUs for 1 minute
    { duration: '10s', target: 0 },  // Ramp-down: gradually decrease to 0 VUs
  ],
};
```

### 🎯 Target API Connection
Ensure that the target URL in your `loadtest.js` script is accessible from within the Docker network:

- If the API is running on your host machine: Use http://host.docker.internal:8080/test
- If the API is running within the same Docker network: Use https://your-api.com/test

### 📊 Monitoring & Debugging
- Grafana is available at `http://localhost:3000`
- InfluxDB is exposed on port `8086` (default) – you can query it directly if needed.

### 📝 Notes
- The k6 container runs once and exits. Use `docker-compose start k6` to rerun.
- For persistent storage of InfluxDB data, consider mounting a volume in `docker-compose.yml`.
- The dashboard IDs (`14801`) are community‑provided; you can also build your own.