import { pool } from "../../index.js"

export const getFormData = async (req, res, next) => {
    const { id } = req.query;

    try {
        // Validate id if provided
        if (id && isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        // Use parameterized query for better security
        const query = id
            ? "SELECT * FROM wp_frmt_form_entry_meta WHERE entry_id = ?"
            : "SELECT * FROM wp_frmt_form_entry_meta";

        const [rows] = await pool.execute(query, id ? [Number(id)] : []);

        // Define form fields based on entry type
        const formFields = rows.length > 12
            ? [
                {
                    name: "Date",
                    meta_key: "date-1"
                },
                {
                    name: "Quote Number",
                    meta_key: "text-1"
                },
                {
                    name: "Departure City",
                    meta_key: "text-2"
                },
                {
                    name: "Destination City",
                    meta_key: "text-3"
                },
                {
                    name: "Cargo Type",
                    meta_key: "select-1"
                },
                {
                    name: "Other Cargo Type",
                    meta_key: "text-4"
                },
                {
                    name: "Vehicle Type",
                    meta_key: "select-2"
                },
                {
                    name: "Other Vehicle Type",
                    meta_key: "text-5"
                },
                {
                    name: "Make",
                    meta_key: "text-6"
                },
                {
                    name: "Model",
                    meta_key: "text-7"
                },
                {
                    name: "Year",
                    meta_key: "text-8"
                },
                {
                    name: "Shipping Method",
                    meta_key: "select-3"
                },
                {
                    name: "Ship Departs",
                    meta_key: "select-4"
                },
                {
                    name: "Transit Time",
                    meta_key: "time-1"
                },
                {
                    name: "Cargo Volume (CBM)",
                    meta_key: "text-9"
                },
                {
                    name: "Exchange Rate",
                    meta_key: "text-10"
                },
                {
                    name: "",
                    meta_key: "select-5"
                },
                {
                    name: "Cost Breakdown",
                    meta_key: "select-6"
                },
                {
                    name: "Other Cost Breakdown",
                    meta_key: "text-11"
                },
                {
                    name: "Notes",
                    meta_key: "textarea-1"
                },
                {
                    name: "Total NZD",
                    meta_key: "currency-1"
                },
                {
                    name: "Customer Email Address",
                    meta_key: "email-1"
                },
                {
                    name: "Customer Name",
                    meta_key: "name-1"
                }
            ]
            : [
                {
                    name: "Quote Number",
                    meta_key: "number-2"
                },
                {
                    name: "Shipping Type",
                    meta_key: "select-7"
                },
                {
                    name: "Date",
                    meta_key: "date-2"
                },
                {
                    name: "Transit Time",
                    meta_key: "text-12"
                },
                {
                    name: "Cargo Details",
                    meta_key: "textarea-2"
                },
                {
                    name: "Cargo Size",
                    meta_key: "text-13"
                },
                {
                    name: "Cargo Weight",
                    meta_key: "select-8"
                },
                {
                    name: "Total NZD",
                    meta_key: "currency-2"
                },
                {
                    name: "Customer Email Address",
                    meta_key: "email-1"
                },
                {
                    name: "Customer Name",
                    meta_key: "name-1"
                }
            ];

        // Process the data
        const processEntry = (entryRows) => {
            return formFields.map(field => {
                const matchingRow = entryRows.find(row => row.meta_key === field.meta_key);
                return {
                    name: field.name,
                    value: matchingRow ? matchingRow.meta_value : null,
                    meta_key: field.meta_key
                };
            });
        };

        // Group data by entry_id if no specific id is requested
        const groupedData = id
            ? processEntry(rows)
            : rows.reduce((acc, row) => {
                if (!acc[row.entry_id]) {
                    acc[row.entry_id] = [];
                }
                const field = formFields.find(f => f.meta_key === row.meta_key);
                if (field) {
                    acc[row.entry_id].push({
                        name: field.name,
                        value: row.meta_value,
                        meta_key: field.meta_key
                    });
                }
                return acc;
            }, {});

        res.json({
            success: true,
            totalEntries: id && Object.keys(groupedData).length,
            data: id ? groupedData : groupedData
        });
    } catch (error) {
        console.error('Database error:', error);
        next(error);
    }
} 