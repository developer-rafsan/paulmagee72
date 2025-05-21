import { db } from "../db/dbconnect.js"

export const getFormData = async (req, res, next) => {
    const { id } = req.query
    try {
        const [rows] = await db.execute("SELECT * FROM wp_frmt_form_entry_meta");

        const result = rows.filter((item) => item.entry_id === Number(id));

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}