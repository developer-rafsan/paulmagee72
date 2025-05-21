import { db } from "../db/dbconnect.js"

export const getFormData = async (req, res, next) => {
    const { id } = req.query
    console.log(id);
    try {
        const [rows] = await db.execute("SELECT * FROM wp_frmt_form_entry_meta");
        console.log(rows);
        let result = [];

        if (!id) {
            result = rows;
        } else {
            result = rows.filter((item) => item.entry_id === Number(id));       
        }
        console.log(result);

        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
} 