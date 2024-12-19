import express from "express";
import authorize from "../middleware/authorize.js";
import db from "../db.js";

const router=express.Router();

router.get("/" , authorize, async(req,res)=>
{
    try {
            const user =await db.query("Select u.user_name, t.todo_id, t.description from users AS u left join todos AS t on u.user_id=t.user_id where u.user_id=$1",[req.user.id]);
            res.json(user.rows);
            
            
    } catch (err) {
                    console.error(err.message);
                    res.status(500).json("Server Error");
    }
});

router.post("/todos" , authorize, async(req,res) =>
{
    try {
            const {description} = req.body;
            const newTodo= await db.query("Insert into todos (user_id, description) values ($1, $2) Returning *",
                [req.user.id,description]
            );
            res.json(newTodo.rows[0]);
    } catch (err) {
            console.error(err.message);
        
    }
});

router.put("/todos/:id" , authorize, async(req,res) =>
{
    try{
    const {id} =req.params;
    const {description} =req.body;
    const updateTodo= await db.query("Update todos set description =$1 where todo_id=$2 and  user_id =$3 RETURNING *",
        [description, id, req.user.id]
    );

    if(updateTodo.rows.length===0)
    {
        return res.json("You dont have access to this todo");
    }
    res.json("Todo was updated");
}
            catch(err)
            {
                console.error(err.message);
            }
});

router.delete("/todos/:id" , authorize, async(req,res) =>
{
    try {
            const {id} =req.params;
            const deleteTodo= await db.query("Delete from todos where todo_id=$1 and user_id=$2 RETURNING *",
                 [id, req.user.id]);

                 if(deleteTodo.rows.length===0)
                 {
                    return res.json("You don't have access to this todo")
                 }

                 res.json("Todo was deleted");
    } catch (err) {

        console.error(err.message);
        
    }
});



export default router;