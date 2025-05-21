import { pool } from "../../index.js"

export const getFormData = async (req, res, next) => {
    const { id } = req.query
    
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
        
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Database error:', error);
        next(error); // Pass to error handling middleware
    }
} 