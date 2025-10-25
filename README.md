# Staff Profit Split

## What is this project?

The **Staff Profit Split** is a minimal utility designed to calculate and **distribute profit shares** among different staff tiers. It allows the user to define the percentage rates for both tax and management, ensuring the final remaining profit is clearly allocated to the service staff.

---

## How It Works

The calculation process requires three main inputs to determine the final distribution. The tax rate and manager share percentage are dynamically set by the user.

### Input Fields

| Field | Description |
| :--- | :--- |
| **Gross Profit ($)** | The total revenue amount before any deductions. |
| **Tax Rate (%)** | The percentage rate of tax to be deducted from the Gross Profit. |
| **Manager Rate (%)** | The percentage rate of the Net Profit to be allocated to the manager. |

### Calculation Logic

The following operations define the profit sharing rules based on the user's input rates:

1.  **Tax:** Calculated as `Gross Profit` multiplied by the `Tax Rate (%)`.
2.  **Net Profit:** Calculated as `Gross Profit` minus the calculated `Tax` amount.
3.  **Manager Share:** Calculated as `Net Profit` multiplied by the `Manager Rate (%)`.
4.  **Waiter Share:** The remaining amount of `Net Profit` after the `Manager Share` is deducted.

### Output Fields

| Field | Description |
| :--- | :--- |
| **Tax** | The calculated dollar amount of the tax deduction. |
| **Net Profit** | The profit amount after the tax deduction. (Reference for allocation) |
| **Manager Share** | The final dollar amount allocated to the manager. |
| **Waiter Share** | The final remaining dollar amount allocated to the waiter staff. |

---

### Formatting Standards

* **Decimal Separator:** Use the **dot (`.`)** for decimal separation (e.g., `1000.50`).
* **Currency Display:** The output uses the simple `$ 0.00` format.
